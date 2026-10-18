export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  id: string;
  name: string;
  rawName: string;
  lang: string;
  isFemale: boolean;
  isNatural: boolean;
  isLocal: boolean;
  isAndroid: boolean;
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

class TTSReaderEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoiceId: string = '';
  private playbackRate: number = 1.0;
  private pauseTimer: ReturnType<typeof setTimeout> | null = null;
  private keepAliveTimer: ReturnType<typeof setInterval> | null = null;
  
  // Sentence-by-sentence queue for natural, continuous reading
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

      // Multi-stage polling: Android Chrome and WebView load voices asynchronously on startup
      const pollDelays = [80, 200, 450, 900, 1800, 3200];
      pollDelays.forEach(delay => {
        setTimeout(() => this.loadVoices(), delay);
      });
      
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', () => this.loadVoices());
      } else if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  // Detect English or compatible voices on all platforms including Android & Samsung
  public isEnglishVoice(v: SpeechSynthesisVoice): boolean {
    const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
    const uri = (v.voiceURI || '').toLowerCase();
    const name = (v.name || '').toLowerCase();

    return (
      lang.startsWith('en') || 
      lang.startsWith('eng') || 
      uri.includes('en-us') || 
      uri.includes('en-gb') || 
      uri.includes('en-au') || 
      uri.includes('en-in') || 
      uri.includes('en_') || 
      name.includes('english')
    );
  }

  // Identify female voices across Desktop, iOS, and Android
  public isFemaleVoice(v: SpeechSynthesisVoice): boolean {
    const lower = `${v.name} ${v.voiceURI || ''} ${v.lang || ''}`.toLowerCase();
    const femaleIndicators = [
      'female', 'sfg', 'iol', 'cxx', 'rjs', 'afh', 'wavenet-a', 'wavenet-c', 'wavenet-e', 'wavenet-f',
      'samantha', 'karen', 'moira', 'tessa', 'fiona',
      'zira', 'jenny', 'aria', 'ava', 'allison', 'susan', 'veena',
      'serena', 'hazel', 'google us english', 'google uk english female'
    ];
    return femaleIndicators.some(indicator => lower.includes(indicator));
  }

  // Voice quality scoring: prioritize high-fidelity natural/neural voices
  private scoreVoice(v: SpeechSynthesisVoice): number {
    const name = v.name.toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();
    const isEng = this.isEnglishVoice(v);

    if (!isEng) return -1000;

    // Filter out notoriously robotic legacy desktop voices
    const roboticBlacklist = [
      'victoria', 'fred', 'ralph', 'albert', 'bad news', 'bahh',
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

    // Google's modern TTS voices on Android and Chrome
    if (name.includes('google uk english female')) score += 100;
    if (name.includes('google us english')) score += 95;
    if (uri.includes('com.google.android.tts') || name.includes('google')) score += 85;

    // Samsung TTS modern engines
    if (name.includes('samsung') || uri.includes('samsung')) score += 80;

    // High quality modern female voices
    if (name.includes('jenny')) score += 90;
    if (name.includes('aria')) score += 90;
    if (name.includes('samantha') && !name.includes('compact')) score += 85;
    if (name.includes('ava')) score += 70;
    if (name.includes('allison')) score += 70;
    if (name.includes('karen')) score += 65;
    if (name.includes('moira')) score += 60;
    if (name.includes('tessa')) score += 60;
    if (name.includes('zira')) score += 50;

    // Local / Offline voices get reliability bonus on mobile devices
    if (v.localService) score += 25;

    // Female bonus
    if (this.isFemaleVoice(v)) score += 30;

    // Standard dialect preference
    const lang = (v.lang || '').toLowerCase();
    if (lang.includes('en-us') || lang.includes('en_us')) score += 15;
    if (lang.includes('en-gb') || lang.includes('en_gb')) score += 12;

    return score;
  }

  // Format technical Android identifiers into clean human-friendly names
  public formatVoiceDisplayName(v: SpeechSynthesisVoice): string {
    const uri = (v.voiceURI || '').toLowerCase();
    const rawName = v.name;
    const isFemale = this.isFemaleVoice(v);
    const isAndroid = uri.includes('android') || uri.includes('samsung') || rawName.toLowerCase().includes('android') || rawName.toLowerCase().includes('samsung');

    let name = rawName
      .replace(/Microsoft /i, '')
      .replace(/Online \(Natural\)/i, 'Natural')
      .replace(/\(United States\)/i, 'US')
      .replace(/\(United Kingdom\)/i, 'UK')
      .replace(/English \(/i, '(')
      .trim();

    // Android Google TTS specific names: "en-us-x-sfg#female_1-local"
    if (name.includes('en-us-x-') || name.includes('en-gb-x-') || name.includes('en-in-x-')) {
      const parts = name.split('-');
      const locale = parts.length > 1 ? parts[1].toUpperCase() : 'US';
      const numMatch = name.match(/female_?(\d+)/i) || name.match(/male_?(\d+)/i) || name.match(/x-([a-z0-9]+)/i);
      const id = numMatch ? numMatch[1] : '1';
      name = `Google ${locale} ${isFemale ? 'Female' : 'Voice'} ${id}`.trim();
    }

    const badges: string[] = [];
    if (isFemale) badges.push('♀ Female');
    if (isAndroid) badges.push('📱 Android');
    if (v.localService) badges.push('Offline');
    else badges.push('Cloud');

    return `${name} [${badges.join(' · ')}]`;
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const freshVoices = this.synth.getVoices();
    if (freshVoices.length > 0) {
      this.voices = freshVoices;
      
      // Attempt to restore user's saved voice preference from localStorage
      const savedVoiceId = typeof localStorage !== 'undefined' ? localStorage.getItem('bookbox_selected_voice') : null;
      if (savedVoiceId) {
        const matched = this.voices.find(v => (v.voiceURI && v.voiceURI === savedVoiceId) || v.name === savedVoiceId);
        if (matched) {
          this.selectedVoiceId = matched.voiceURI || matched.name;
          return;
        }
      }

      // If no valid saved voice, auto-select highest-scoring English/Android female voice
      if (!this.selectedVoiceId) {
        let candidates = this.voices.filter(v => this.isEnglishVoice(v));
        if (candidates.length === 0) candidates = this.voices;

        const sorted = [...candidates].sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
        if (sorted.length > 0) {
          this.selectedVoiceId = sorted[0].voiceURI || sorted[0].name;
        }
      }
    }
  }

  public getVoices(): VoiceOption[] {
    if (!this.synth) return [];
    const currentList = this.synth.getVoices();
    if (currentList.length > 0) {
      this.voices = currentList;
    }

    let list = this.voices.filter(v => this.isEnglishVoice(v));
    // If phone has no English voices explicitly labeled, show all device voices so it never breaks
    if (list.length === 0 && this.voices.length > 0) {
      list = this.voices;
    }

    return list
      .map(v => {
        const score = this.scoreVoice(v);
        const isFemale = this.isFemaleVoice(v);
        const isNatural = score >= 80;
        const isLocal = Boolean(v.localService);
        const uri = (v.voiceURI || '').toLowerCase();
        const rawLower = v.name.toLowerCase();
        const isAndroid = uri.includes('android') || uri.includes('samsung') || rawLower.includes('android') || rawLower.includes('samsung');
        const displayName = this.formatVoiceDisplayName(v);

        return {
          voice: v,
          id: v.voiceURI || v.name,
          name: displayName,
          rawName: v.name,
          lang: v.lang,
          isFemale,
          isNatural,
          isLocal,
          isAndroid,
          score
        };
      })
      .sort((a, b) => b.score - a.score);
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const all = this.synth.getVoices();
    if (all.length === 0) return null;

    if (this.selectedVoiceId) {
      const match = all.find(v => (v.voiceURI && v.voiceURI === this.selectedVoiceId) || v.name === this.selectedVoiceId);
      if (match) return match;
    }

    // Default to top scoring female voice or first available
    const sorted = [...all].filter(v => this.isEnglishVoice(v)).sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
    return sorted[0] || all[0] || null;
  }

  public setVoice(voice: SpeechSynthesisVoice): void {
    this.selectedVoiceId = voice.voiceURI || voice.name;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('bookbox_selected_voice', this.selectedVoiceId);
      }
    } catch {
      // Storage unavailable
    }
  }

  // Instant voice sample preview
  public testVoice(voice: SpeechSynthesisVoice): void {
    if (!this.synth) return;
    this.synth.cancel();
    const testUtterance = new SpeechSynthesisUtterance("Hello! I am BookBox, your reading companion.");
    testUtterance.voice = voice;
    testUtterance.rate = this.playbackRate;
    testUtterance.pitch = 1.0;
    (window as unknown as { __bookbox_test_utterance: SpeechSynthesisUtterance }).__bookbox_test_utterance = testUtterance;
    this.synth.speak(testUtterance);
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

  // Pre-process text to remove markdown, expand abbreviations, and ensure natural speech
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
    
    // Split on sentence boundaries (. ! ? or newline)
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

  // Android Chrome 15-second background speech freeze watchdog
  private startKeepAlive(): void {
    this.stopKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (this.synth && this.synth.speaking && !this.isUserPaused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 9000);
  }

  private stopKeepAlive(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  public play(
    text: string, 
    onBoundary?: BoundaryCallback, 
    onEnd?: EndCallback, 
    onStateChange?: StateChangeCallback,
    startSentenceIdx: number = 0
  ): void {
    if (!this.synth) return;

    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    this.stopKeepAlive();

    this.synth.cancel();

    this.rawText = text;
    this.onBoundaryCallback = onBoundary || null;
    this.onEndCallback = onEnd || null;
    this.onStateChangeCallback = onStateChange || null;

    this.sentences = this.splitIntoSentenceChunks(text);
    this.currentSentenceIdx = Math.max(0, Math.min(startSentenceIdx, this.sentences.length - 1));
    this.isUserPaused = false;
    this.isCurrentlyActive = true;

    if (this.sentences.length === 0) {
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    this.startKeepAlive();

    setTimeout(() => {
      this.speakCurrentSentence();
    }, 60);
  }

  private speakCurrentSentence(): void {
    if (!this.synth || !this.isCurrentlyActive || this.isUserPaused) return;

    if (this.currentSentenceIdx >= this.sentences.length) {
      // Completed all sentences in the text
      this.stopKeepAlive();
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

    // Dynamically resolve voice from fresh getVoices() array
    const voiceToUse = this.getSelectedVoice();
    if (voiceToUse) {
      utterance.voice = voiceToUse;
    }
    
    utterance.rate = this.playbackRate;
    utterance.pitch = 1.0;

    // Prevent V8 garbage collector from aborting speech mid-sentence
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
      
      // Natural 200ms breathing pause between sentences
      if (this.pauseTimer) clearTimeout(this.pauseTimer);
      this.pauseTimer = setTimeout(() => {
        this.speakCurrentSentence();
      }, 200);
    };

    utterance.onerror = (e) => {
      console.warn('TTSReader utterance event:', e.error, e);

      // If cloud network voice failed, automatically switch to offline local device voice
      if (e.error === 'network' || e.error === 'synthesis-failed' || e.error === 'canceled') {
        const allVoices = this.synth?.getVoices() || [];
        const localVoice = allVoices.find(v => v.localService && this.isEnglishVoice(v) && this.isFemaleVoice(v)) ||
                           allVoices.find(v => v.localService && this.isEnglishVoice(v)) ||
                           allVoices.find(v => v.localService);

        if (localVoice && voiceToUse && !voiceToUse.localService) {
          console.info(`Switching from cloud voice (${voiceToUse.name}) to offline device voice (${localVoice.name})`);
          this.setVoice(localVoice);
          setTimeout(() => this.speakCurrentSentence(), 60);
          return;
        }
      }

      if (!this.isUserPaused) {
        this.currentSentenceIdx++;
        this.speakCurrentSentence();
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(true, false, this.currentSentenceIdx + 1, this.sentences.length);
    }
  }

  public pause(): void {
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    this.stopKeepAlive();
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
      this.startKeepAlive();
      this.speakCurrentSentence();
    }
  }

  public nextSentence(): void {
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    if (this.currentSentenceIdx < this.sentences.length - 1) {
      this.currentSentenceIdx++;
      if (this.synth) this.synth.cancel();
      if (this.isPlaying()) {
        setTimeout(() => this.speakCurrentSentence(), 50);
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
      if (this.synth) this.synth.cancel();
      if (this.isPlaying()) {
        setTimeout(() => this.speakCurrentSentence(), 50);
      } else if (this.onBoundaryCallback && this.sentences[this.currentSentenceIdx]) {
        const s = this.sentences[this.currentSentenceIdx];
        this.onBoundaryCallback(s.start, s.length, this.currentSentenceIdx + 1, this.sentences.length);
      }
    }
  }

  private stopInternal(): void {
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    this.stopKeepAlive();
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

export const speechService = new TTSReaderEngine();
export const TTSReader = speechService;
