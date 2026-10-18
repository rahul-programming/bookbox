export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
}

export type BoundaryCallback = (charIndex: number, charLength: number) => void;
export type EndCallback = () => void;
export type StateChangeCallback = (isPlaying: boolean, isPaused: boolean) => void;

class WebSpeechAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private playbackRate: number = 1.0;
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

  private loadVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    
    // Auto-select preferred natural English voice if none selected
    if (!this.selectedVoice && this.voices.length > 0) {
      const preferred = this.voices.find(v => 
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Siri')) &&
        v.lang.startsWith('en')
      ) || this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
      
      this.selectedVoice = preferred;
    }
  }

  public getVoices(): VoiceOption[] {
    return this.voices
      .filter(v => v.lang.startsWith('en'))
      .map(v => ({ voice: v, name: v.name, lang: v.lang }));
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
    return this.synth ? this.synth.speaking && !this.synth.paused : false;
  }

  public isPaused(): boolean {
    return this.synth ? this.synth.paused : false;
  }

  public play(
    text: string, 
    onBoundary?: BoundaryCallback, 
    onEnd?: EndCallback, 
    onStateChange?: StateChangeCallback
  ): void {
    if (!this.synth) return;

    this.stop();

    this.onBoundaryCallback = onBoundary || null;
    this.onEndCallback = onEnd || null;
    this.onStateChangeCallback = onStateChange || null;

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = this.playbackRate;
    utterance.pitch = 1.0;

    utterance.onboundary = (event) => {
      if (this.onBoundaryCallback && (event.name === 'word' || event.name === 'sentence')) {
        this.onBoundaryCallback(event.charIndex, event.charLength || 0);
      }
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(false, false);
      }
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis utterance error:', e);
      this.currentUtterance = null;
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(false, false);
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(true, false);
    }
  }

  public pause(): void {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(false, true);
      }
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(true, false);
      }
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(false, false);
      }
    }
  }
}

export const speechService = new WebSpeechAudioEngine();
