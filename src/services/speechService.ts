export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isFemale: boolean;
}

export interface SentenceChunk {
  text: string;
  start: number;
  length: number;
}

export type BoundaryCallback = (charIndex: number, charLength: number, sentenceIndex: number, totalSentences: number) => void;
export type EndCallback = () => void;
export type StateChangeCallback = (isPlaying: boolean, isPaused: boolean, currentSentence: number, totalSentences: number) => void;

class WebSpeechAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private playbackRate: number = 1.0;
  
  // Sentence-by-sentence queue for continuous reading without Chrome cutoff
  private sentences: SentenceChunk[] = [];
  private currentSentenceIdx: number = 0;
  private isUserPaused: boolean = false;
  private isCurrentlyActive: boolean = false;

  private onBoundaryCallback: BoundaryCallback | null = null;
  private onEndCallback: EndCallback | null = null;
  private onStateChangeCallback: StateChangeCallback | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private isFemaleVoice(v: SpeechSynthesisVoice): boolean {
    const lower = `${v.name} ${v.voiceURI}`.toLowerCase();
    const femaleIndicators = [
      'female', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona',
      'zira', 'jenny', 'ava', 'allison', 'susan', 'veena', 'serena', 'hazel',
      'google us english' // Chrome's default Google US English is female
    ];
    return femaleIndicators.some(indicator => lower.includes(indicator));
  }

  private loadVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    
    // Auto-select preferred female English voice
    if (!this.selectedVoice && this.voices.length > 0) {
      const englishVoices = this.voices.filter(v => v.lang.startsWith('en'));
      
      // 1. Look for top-tier known female voices (Samantha, Victoria, Karen, Zira, Google US English)
      const topFemale = englishVoices.find(v => {
        const n = v.name.toLowerCase();
        return n.includes('samantha') || n.includes('victoria') || n.includes('karen') || n.includes('google us english') || n.includes('zira');
      });

      // 2. Look for any voice with female indicator
      const anyFemale = englishVoices.find(v => this.isFemaleVoice(v));

      // 3. Fallback to any natural English voice
      const preferred = topFemale || anyFemale || englishVoices[0] || this.voices[0];
      
      this.selectedVoice = preferred;
    }
  }

  public getVoices(): VoiceOption[] {
    return this.voices
      .filter(v => v.lang.startsWith('en'))
      .map(v => ({
        voice: v,
        name: `${v.name} ${this.isFemaleVoice(v) ? '♀ (Female)' : ''}`.trim(),
        lang: v.lang,
        isFemale: this.isFemaleVoice(v)
      }))
      .sort((a, b) => {
        // Put female voices first
        if (a.isFemale && !b.isFemale) return -1;
        if (!a.isFemale && b.isFemale) return 1;
        return a.name.localeCompare(b.name);
      });
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public setVoice(voice: SpeechSynthesisVoice): void {
    this.selectedVoice = voice;
  }

  public setPlaybackRate(rate: number): void {
    this.playbackRate = Math.max(0.5, Math.min(2.5, rate));
  }

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  public isAvailable(): boolean {
    return this.synth !== null;
  }

  public isPlaying(): boolean {
    return this.isCurrentlyActive && !this.isUserPaused;
  }

  public isPaused(): boolean {
    return this.isUserPaused;
  }

  public getSentenceProgress(): { current: number; total: number } {
    return {
      current: this.currentSentenceIdx + 1,
      total: Math.max(1, this.sentences.length)
    };
  }

  private splitIntoSentenceChunks(text: string): SentenceChunk[] {
    if (!text || text.trim().length === 0) return [];
    
    // Split on sentence boundary while preserving text offsets
    const regex = /[^.!?\n\r]+(?:[.!?]+|[\n\r]+|$)/g;
    const chunks: SentenceChunk[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const chunkText = match[0].trim();
      if (chunkText.length > 0) {
        chunks.push({
          text: chunkText,
          start: match.index,
          length: match[0].length
        });
      }
    }

    if (chunks.length === 0 && text.trim().length > 0) {
      chunks.push({ text: text.trim(), start: 0, length: text.length });
    }

    return chunks;
  }

  public play(
    text: string, 
    onBoundary?: BoundaryCallback, 
    onEnd?: EndCallback, 
    onStateChange?: StateChangeCallback,
    startSentenceIdx: number = 0
  ): void {
    if (!this.synth) return;

    // Reset current speech
    this.stopInternal();

    this.onBoundaryCallback = onBoundary || null;
    this.onEndCallback = onEnd || null;
    this.onStateChangeCallback = onStateChange || null;

    // Split text into discrete sentence units to bypass browser 15s freeze bug
    this.sentences = this.splitIntoSentenceChunks(text);
    this.currentSentenceIdx = Math.max(0, Math.min(startSentenceIdx, this.sentences.length - 1));
    this.isUserPaused = false;
    this.isCurrentlyActive = true;

    if (this.sentences.length === 0) {
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    this.speakCurrentSentence();
  }

  private speakCurrentSentence(): void {
    if (!this.synth || !this.isCurrentlyActive || this.isUserPaused) return;

    if (this.currentSentenceIdx >= this.sentences.length) {
      // Completed all sentences in the text
      this.isCurrentlyActive = false;
      this.currentUtterance = null;
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(false, false, this.sentences.length, this.sentences.length);
      }
      if (this.onEndCallback) {
        this.onEndCallback();
      }
      return;
    }

    const currentChunk = this.sentences[this.currentSentenceIdx];
    const utterance = new SpeechSynthesisUtterance(currentChunk.text);

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = this.playbackRate;
    // Set pitch slightly higher for natural pleasant female resonance
    utterance.pitch = 1.05;

    // Keep global reference so browser garbage collector doesn't cancel utterance
    (window as unknown as { __bookbox_active_utterance: SpeechSynthesisUtterance }).__bookbox_active_utterance = utterance;

    // Initial boundary trigger at sentence start
    if (this.onBoundaryCallback) {
      this.onBoundaryCallback(
        currentChunk.start, 
        currentChunk.length, 
        this.currentSentenceIdx + 1, 
        this.sentences.length
      );
    }

    utterance.onboundary = (event) => {
      if (this.onBoundaryCallback && (event.name === 'word' || event.name === 'sentence')) {
        this.onBoundaryCallback(
          currentChunk.start + event.charIndex, 
          event.charLength || 5, 
          this.currentSentenceIdx + 1, 
          this.sentences.length
        );
      }
    };

    utterance.onend = () => {
      if (!this.isCurrentlyActive || this.isUserPaused) return;
      // Advance to next sentence automatically
      this.currentSentenceIdx++;
      this.speakCurrentSentence();
    };

    utterance.onerror = (e) => {
      // Ignore interrupted error caused by manual pause or stop
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.warn('Speech synthesis utterance error:', e);
      if (!this.isUserPaused) {
        this.currentSentenceIdx++;
        this.speakCurrentSentence();
      }
    };

    this.currentUtterance = utterance;
    this.synth.cancel(); // Clear any hung queue before speaking chunk
    this.synth.speak(utterance);

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(true, false, this.currentSentenceIdx + 1, this.sentences.length);
    }
  }

  public pause(): void {
    if (this.synth) {
      this.isUserPaused = true;
      this.synth.cancel(); // Canceling utterance while retaining currentSentenceIdx provides reliable pause
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(false, true, this.currentSentenceIdx + 1, this.sentences.length);
      }
    }
  }

  public resume(): void {
    if (this.synth && this.isCurrentlyActive && this.isUserPaused) {
      this.isUserPaused = false;
      this.speakCurrentSentence();
    }
  }

  public nextSentence(): void {
    if (this.currentSentenceIdx < this.sentences.length - 1) {
      this.currentSentenceIdx++;
      if (this.isPlaying()) {
        this.speakCurrentSentence();
      } else if (this.onBoundaryCallback && this.sentences[this.currentSentenceIdx]) {
        const s = this.sentences[this.currentSentenceIdx];
        this.onBoundaryCallback(s.start, s.length, this.currentSentenceIdx + 1, this.sentences.length);
      }
    }
  }

  public previousSentence(): void {
    if (this.currentSentenceIdx > 0) {
      this.currentSentenceIdx--;
      if (this.isPlaying()) {
        this.speakCurrentSentence();
      } else if (this.onBoundaryCallback && this.sentences[this.currentSentenceIdx]) {
        const s = this.sentences[this.currentSentenceIdx];
        this.onBoundaryCallback(s.start, s.length, this.currentSentenceIdx + 1, this.sentences.length);
      }
    }
  }

  private stopInternal(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
    this.isCurrentlyActive = false;
    this.isUserPaused = false;
  }

  public stop(): void {
    this.stopInternal();
    this.currentSentenceIdx = 0;
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(false, false, 0, Math.max(1, this.sentences.length));
    }
  }
}

export const speechService = new WebSpeechAudioEngine();
