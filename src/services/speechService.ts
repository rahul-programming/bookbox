export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isFemale: boolean;
  isNatural: boolean;
  score: number;
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
  private pauseTimer: ReturnType<typeof setTimeout> | null = null;
  
  // Sentence-by-sentence queue for continuous, natural reading
  private rawText: string = '';
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

  // Identify female voices accurately
  private isFemaleVoice(v: SpeechSynthesisVoice): boolean {
    const lower = `${v.name} ${v.voiceURI}`.toLowerCase();
    const femaleIndicators = [
      'female', 'samantha', 'karen', 'moira', 'tessa', 'fiona',
      'zira', 'jenny', 'aria', 'ava', 'allison', 'susan', 'veena',
      'serena', 'hazel', 'google us english', 'google uk english female'
    ];
    return femaleIndicators.some(indicator => lower.includes(indicator));
  }

  // Voice quality scoring: prioritize high-fidelity natural/neural voices and avoid legacy robotic voices
  private scoreVoice(v: SpeechSynthesisVoice): number {
    const name = v.name.toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();
    const lang = v.lang.toLowerCase();

    // English voices only
    if (!lang.startsWith('en')) return -1000;

    // Filter out notorious robotic Mac legacy voices and compact low-bitrate voices
    const roboticBlacklist = [
      'victoria', 'compact', 'fred', 'ralph', 'albert', 'bad news', 'bahh',
      'bells', 'boing', 'bubbles', 'cellos', 'deranged', 'good news',
      'hysterical', 'junior', 'pipe organ', 'trinoids', 'whisper', 'zarvox'
    ];
    if (roboticBlacklist.some(r => name.includes(r) || uri.includes(r))) {
      return -500;
    }

    let score = 0;

    // Neural / Natural online voices are top tier
    if (name.includes('natural') || uri.includes('natural')) score += 150;
    if (name.includes('neural') || uri.includes('neural')) score += 140;
    if (name.includes('online') || uri.includes('online')) score += 130;
    if (name.includes('enhanced') || uri.includes('enhanced')) score += 110;
    if (name.includes('premium') || uri.includes('premium')) score += 110;

    // Google's modern TTS voices in Chrome
    if (name.includes('google uk english female')) score += 100;
    if (name.includes('google us english')) score += 95;
    if (name.includes('google')) score += 60;

    // High quality modern female voices
    if (name.includes('jenny')) score += 90;
    if (name.includes('aria')) score += 90;
    if (name.includes('samantha') && !name.includes('compact')) score += 75;
    if (name.includes('ava')) score += 70;
    if (name.includes('allison')) score += 70;
    if (name.includes('karen')) score += 65;
    if (name.includes('moira')) score += 60;
    if (name.includes('tessa')) score += 60;
    if (name.includes('zira')) score += 50;

    // Female bonus
    if (this.isFemaleVoice(v)) score += 30;

    // Standard dialect preference
    if (lang === 'en-us' || lang === 'en_us') score += 15;
    if (lang === 'en-gb' || lang === 'en_gb') score += 12;

    return score;
  }

  private loadVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    
    if (this.voices.length > 0) {
      // Sort all English voices by naturalness score
      const sorted = [...this.voices]
        .filter(v => v.lang.startsWith('en'))
        .sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));

      // Auto-select the highest scored natural female voice
      if (sorted.length > 0) {
        if (!this.selectedVoice || this.scoreVoice(this.selectedVoice) < 0) {
          this.selectedVoice = sorted[0];
        }
      }
    }
  }

  public getVoices(): VoiceOption[] {
    return this.voices
      .filter(v => v.lang.startsWith('en'))
      .map(v => {
        const score = this.scoreVoice(v);
        const isFemale = this.isFemaleVoice(v);
        const isNatural = score >= 80;
        let displayName = v.name
          .replace(/Microsoft /i, '')
          .replace(/Google /i, 'Google ')
          .replace(/Online \(Natural\)/i, 'Natural')
          .replace(/\(United States\)/i, 'US')
          .replace(/\(United Kingdom\)/i, 'UK')
          .trim();

        if (isNatural) displayName = `🌟 ${displayName}`;
        if (isFemale) displayName = `${displayName} ♀ (Female)`;

        return {
          voice: v,
          name: displayName,
          lang: v.lang,
          isFemale,
          isNatural,
          score
        };
      })
      .sort((a, b) => b.score - a.score);
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public setVoice(voice: SpeechSynthesisVoice): void {
    this.selectedVoice = voice;
  }

  public setPlaybackRate(rate: number): void {
    this.playbackRate = Math.max(0.6, Math.min(2.0, rate));
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

  // Pre-process text to remove markdown, expand abbreviations, and ensure natural pronunciation
  public cleanTextForSpeech(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_{1,2}(.*?)_{1,2}/g, '$1')
      .replace(/#+\s+/g, '')
      .replace(/`{1,3}.*?`{1,3}/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/•\s*/g, '')
      .replace(/—|–/g, ', ')
      .replace(/\be\.g\.,?\s*/gi, 'for example, ')
      .replace(/\bi\.e\.,?\s*/gi, 'that is, ')
      .replace(/\bvs\.,?\s*/gi, 'versus ')
      .replace(/&/g, 'and')
      .trim();
  }

  private splitIntoSentenceChunks(text: string): SentenceChunk[] {
    if (!text || text.trim().length === 0) return [];
    
    // Split on sentence boundary (. ! ? or newline)
    const regex = /[^.!?\n\r]+(?:[.!?]+|[\n\r]+|$)/g;
    const chunks: SentenceChunk[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const chunkText = this.cleanTextForSpeech(match[0]);
      if (chunkText.length > 0) {
        chunks.push({
          text: chunkText,
          start: match.index,
          length: match[0].length
        });
      }
    }

    if (chunks.length === 0 && text.trim().length > 0) {
      chunks.push({ text: this.cleanTextForSpeech(text), start: 0, length: text.length });
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

    this.rawText = text;
    this.onBoundaryCallback = onBoundary || null;
    this.onEndCallback = onEnd || null;
    this.onStateChangeCallback = onStateChange || null;

    // Split text into discrete sentence units for smooth cadence and freeze prevention
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
    // Strict 1.0 pitch preserves authentic, unwarped human vocal formants
    utterance.pitch = 1.0;

    // Keep global reference so browser garbage collector never aborts playback
    (window as unknown as { __bookbox_active_utterance: SpeechSynthesisUtterance }).__bookbox_active_utterance = utterance;

    // Notify UI of active sentence boundary
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
      
      this.currentSentenceIdx++;
      
      // Insert a natural 240ms breathing pause between sentences for realistic human cadence
      if (this.pauseTimer) clearTimeout(this.pauseTimer);
      this.pauseTimer = setTimeout(() => {
        this.speakCurrentSentence();
      }, 240);
    };

    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.warn('Speech synthesis utterance error:', e);
      if (!this.isUserPaused) {
        this.currentSentenceIdx++;
        this.speakCurrentSentence();
      }
    };

    this.currentUtterance = utterance;
    this.synth.cancel(); // Flush queue cleanly before chunk
    this.synth.speak(utterance);

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(true, false, this.currentSentenceIdx + 1, this.sentences.length);
    }
  }

  public pause(): void {
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    if (this.synth) {
      this.isUserPaused = true;
      this.synth.cancel();
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
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
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
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
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
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
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
