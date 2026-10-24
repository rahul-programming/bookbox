import React, { useEffect, useState, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  RotateCcw, 
  FastForward, 
  SkipBack, 
  SkipForward, 
  X,
  Sparkles,
  Sliders,
  Minus,
  Plus
} from 'lucide-react';
import { speechService, VoiceOption } from '../services/speechService';

interface AudioPlayerBarProps {
  bookTitle: string;
  activeHeadline: string;
  activeText: string;
  onSentenceHighlight?: (charIndex: number, length: number) => void;
  onNext?: () => void;
  onClose?: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  bookTitle,
  activeHeadline,
  activeText,
  onSentenceHighlight,
  onNext,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<number>(speechService.getPlaybackRate());
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [filterFemaleOnly, setFilterFemaleOnly] = useState(false);
  const [sentenceInfo, setSentenceInfo] = useState({ current: 1, total: 1 });
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');

  // Load and continuously sync voices for Android asynchronous discovery
  useEffect(() => {
    const updateVoiceList = () => {
      const vList = speechService.getVoices();
      if (vList.length > 0) {
        setVoices(vList);
        const current = speechService.getSelectedVoice();
        if (current) {
          setSelectedVoiceId(current.voiceURI || current.name);
        }
      }
    };

    updateVoiceList();

    // Aggressive multi-delay polling for Android Chrome / WebView / Samsung Internet
    const timers = [100, 300, 700, 1500, 3000].map(ms => setTimeout(updateVoiceList, ms));

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', updateVoiceList);
      return () => {
        timers.forEach(t => clearTimeout(t));
        window.speechSynthesis.removeEventListener('voiceschanged', updateVoiceList);
      };
    }
  }, []);

  // When active text changes (e.g., user moves to next chapter or switches tabs), start playback
  useEffect(() => {
    if (activeText && activeText.trim().length > 0) {
      startPlayback(0);
    }
  }, [activeText, activeHeadline]);

  const startPlayback = (startSentenceIdx: number = 0) => {
    speechService.play(
      activeText,
      (charIndex, charLength, sentIdx, totalSents) => {
        setSentenceInfo({ current: sentIdx, total: totalSents });
        if (onSentenceHighlight) onSentenceHighlight(charIndex, charLength);
      },
      () => {
        setIsPlaying(false);
        setIsPaused(false);
        if (onNext) onNext();
      },
      (playing, paused, currentSent, totalSents) => {
        setIsPlaying(playing);
        setIsPaused(paused);
        setSentenceInfo({ current: currentSent, total: totalSents });
      },
      startSentenceIdx
    );
  };

  const handlePlayToggle = () => {
    if (isPaused) {
      speechService.resume();
    } else if (isPlaying) {
      speechService.pause();
    } else {
      startPlayback(Math.max(0, sentenceInfo.current - 1));
    }
  };

  const handleStop = () => {
    speechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
    if (onSentenceHighlight) onSentenceHighlight(-1, 0);
  };

  const handlePreviousSentence = () => {
    speechService.previousSentence();
    const prog = speechService.getSentenceProgress();
    setSentenceInfo(prog);
  };

  const handleNextSentence = () => {
    speechService.nextSentence();
    const prog = speechService.getSentenceProgress();
    setSentenceInfo(prog);
  };

  const SPEED_STEPS = [0.75, 0.85, 1.0, 1.15, 1.25, 1.5, 1.75, 2.0];

  const handleSpeedSelect = (newSpeed: number) => {
    speechService.setPlaybackRate(newSpeed);
    setSpeed(newSpeed);
  };

  const handleDecreaseSpeed = () => {
    const currentIndex = SPEED_STEPS.findIndex(s => Math.abs(s - speed) < 0.02);
    if (currentIndex > 0) {
      handleSpeedSelect(SPEED_STEPS[currentIndex - 1]);
    } else if (currentIndex === -1) {
      const smaller = SPEED_STEPS.filter(s => s < speed);
      if (smaller.length > 0) {
        handleSpeedSelect(smaller[smaller.length - 1]);
      } else {
        handleSpeedSelect(SPEED_STEPS[0]);
      }
    }
  };

  const handleIncreaseSpeed = () => {
    const currentIndex = SPEED_STEPS.findIndex(s => Math.abs(s - speed) < 0.02);
    if (currentIndex !== -1 && currentIndex < SPEED_STEPS.length - 1) {
      handleSpeedSelect(SPEED_STEPS[currentIndex + 1]);
    } else if (currentIndex === -1) {
      const larger = SPEED_STEPS.filter(s => s > speed);
      if (larger.length > 0) {
        handleSpeedSelect(larger[0]);
      } else {
        handleSpeedSelect(SPEED_STEPS[SPEED_STEPS.length - 1]);
      }
    }
  };

  const cycleSpeed = () => {
    const currentIndex = SPEED_STEPS.findIndex(s => Math.abs(s - speed) < 0.02);
    const nextIndex = currentIndex === -1 ? 2 : (currentIndex + 1) % SPEED_STEPS.length;
    handleSpeedSelect(SPEED_STEPS[nextIndex]);
  };

  const handleVoiceSelectById = (id: string) => {
    const chosen = voices.find(v => v.id === id || v.rawName === id || v.voice.name === id);
    if (chosen) {
      speechService.setVoice(chosen.voice);
      setSelectedVoiceId(chosen.id);
      if (isPlaying && !isPaused) {
        const curr = Math.max(0, sentenceInfo.current - 1);
        startPlayback(curr);
      }
    }
  };

  const handleTestVoice = () => {
    const active = speechService.getSelectedVoice();
    if (active) {
      speechService.testVoice(active);
    }
  };

  const activeVoice = speechService.getSelectedVoice();

  // Categorize voices for iPhone iOS & Android Native <select> <optgroup> rendering
  const { femaleVoices, deviceVoices, otherVoices } = useMemo(() => {
    const list = filterFemaleOnly ? voices.filter(v => v.isFemale) : voices;
    const female = list.filter(v => v.isFemale);
    const device = list.filter(v => !v.isFemale && (v.isAndroid || (v.voice.voiceURI || '').toLowerCase().includes('apple')));
    const other = list.filter(v => !v.isFemale && !v.isAndroid && !(v.voice.voiceURI || '').toLowerCase().includes('apple'));

    return {
      femaleVoices: female,
      deviceVoices: device,
      otherVoices: other
    };
  }, [voices, filterFemaleOnly]);

  return (
    <>
      {/* Floating Audio Narration Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-2.5 sm:p-3.5 bg-slate-900/95 dark:bg-slate-950/95 text-white border-t border-slate-700/80 backdrop-blur-lg shadow-2xl transition-all max-w-full overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 w-full min-w-0">
          
          {/* LEFT-ALIGNED: Complete Playback Controls + Speed Stepper + Voice Modal Trigger */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            
            {/* Main Play / Pause Button */}
            <button
              onClick={handlePlayToggle}
              className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title={isPlaying && !isPaused ? 'Pause' : 'Play Narration'}
            >
              {isPlaying && !isPaused ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Previous Sentence */}
            <button
              onClick={handlePreviousSentence}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Previous Sentence"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Next Sentence */}
            <button
              onClick={handleNextSentence}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Next Sentence"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Replay From Start */}
            <button
              onClick={() => startPlayback(0)}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Restart from Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Stop Button */}
            <button
              onClick={handleStop}
              className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Stop Audio"
            >
              <Square className="w-4 h-4" />
            </button>

            {/* Next Section (if provided) */}
            {onNext && (
              <button
                onClick={onNext}
                className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Next Section"
              >
                <FastForward className="w-4 h-4" />
              </button>
            )}

            {/* SPEED CONTROLS: Left-aligned [-] speed [+] Stepper */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg p-0.5 ml-0.5">
              <button
                onClick={handleDecreaseSpeed}
                disabled={speed <= SPEED_STEPS[0]}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                title="Decrease Speed (-)"
                aria-label="Decrease narration speed"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={cycleSpeed}
                className="px-1.5 text-xs font-bold font-mono text-blue-400 hover:text-blue-300 transition cursor-pointer select-none min-w-[38px] text-center"
                title="Click to cycle speed"
              >
                {speed}x
              </button>
              <button
                onClick={handleIncreaseSpeed}
                disabled={speed >= SPEED_STEPS[SPEED_STEPS.length - 1]}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                title="Increase Speed (+)"
                aria-label="Increase narration speed"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dedicated TTSReader Voice Modal Trigger */}
            <button
              onClick={() => setShowVoiceModal(true)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition border border-slate-700 cursor-pointer"
              title="Open TTSReader Voice Settings"
            >
              <Volume2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span className="hidden lg:inline max-w-[110px] truncate text-slate-200 font-medium">
                {activeVoice ? activeVoice.name.replace(/Google/i, '').replace(/\(Female\)/i, '').replace(/🌟/i, '').trim() : 'Voice'}
              </span>
              <span className="text-[10px] text-pink-300 font-bold px-1.5 py-0.2 rounded bg-pink-950/80 border border-pink-700/60">
                ♀ Natural
              </span>
              <Sliders className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>
          </div>

          {/* RIGHT-ALIGNED / SUMMARY: Track Info, Sentence Progress, and Close Button */}
          <div className="flex items-center justify-between md:justify-end gap-3 min-w-0">
            <div className="min-w-0 text-left md:text-right">
              <div className="flex items-center space-x-2 md:justify-end">
                <span className={`w-2 h-2 rounded-full shrink-0 ${isPlaying && !isPaused ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 truncate max-w-[130px] sm:max-w-[200px]">
                  {bookTitle}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700 shrink-0">
                  Sentence {sentenceInfo.current}/{sentenceInfo.total}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 truncate mt-0.5 max-w-[240px] sm:max-w-[320px]">
                {activeHeadline}
              </p>
            </div>

            {/* Close Floating Bar */}
            {onClose && (
              <button
                onClick={() => {
                  handleStop();
                  onClose();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
                title="Close Player"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* TTSReader Voice Settings Modal Dialog (Works 100% on Android touch devices) */}
      {showVoiceModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowVoiceModal(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 text-white text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Volume2 className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
                    <span>TTSReader Voice Settings</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      iPhone & Android Ready
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    High-fidelity neural and offline system voice models
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowVoiceModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterFemaleOnly(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  !filterFemaleOnly
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All Available Voices ({voices.length})
              </button>
              <button
                onClick={() => setFilterFemaleOnly(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                  filterFemaleOnly
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>♀ Female Voices Only</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">
                  {voices.filter(v => v.isFemale).length}
                </span>
              </button>
            </div>

            {/* Native Mobile Voice Picker Dropdown (Triggers iOS / Android Native Selection Dialog) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Voice Model:
              </label>

              {voices.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-400 flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Loading device speech synthesis models...</span>
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={selectedVoiceId || activeVoice?.voiceURI || activeVoice?.name || ''}
                    onChange={(e) => handleVoiceSelectById(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-800 text-slate-100 border border-slate-700 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition cursor-pointer"
                  >
                    {femaleVoices.length > 0 && (
                      <optgroup label="🌟 High-Fidelity Female Voices (Recommended)">
                        {femaleVoices.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {deviceVoices.length > 0 && (
                      <optgroup label="📱 iPhone & Android System Voices">
                        {deviceVoices.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {otherVoices.length > 0 && (
                      <optgroup label="🎙️ Other Available System Voices">
                        {otherVoices.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </div>
              )}

              <p className="text-[11px] text-slate-400">
                💡 Tip: Fully compatible with iPhone (iOS Safari) and Android devices. Select your preferred voice and tap Test Voice to verify.
              </p>
            </div>

            {/* Test Selected Voice Button - Left Aligned */}
            <div>
              <button
                type="button"
                onClick={handleTestVoice}
                className="w-full flex items-center justify-start space-x-2.5 px-4 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 font-semibold text-xs sm:text-sm transition transform active:scale-98 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-pink-400 animate-pulse shrink-0" />
                <span>Test Selected Voice (Hear Sample) 🔊</span>
              </button>
            </div>

            {/* Narration Speed Selection - Left-aligned with Stepper [-] and [+] */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Narration Speed:
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {/* Stepper with explicit Decrease / Increase buttons */}
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={handleDecreaseSpeed}
                    disabled={speed <= SPEED_STEPS[0]}
                    className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                    title="Decrease Speed (-)"
                    aria-label="Decrease speed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold font-mono text-blue-400 select-none min-w-[50px] text-center">
                    {speed}x
                  </span>
                  <button
                    type="button"
                    onClick={handleIncreaseSpeed}
                    disabled={speed >= SPEED_STEPS[SPEED_STEPS.length - 1]}
                    className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                    title="Increase Speed (+)"
                    aria-label="Increase speed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Preset speed buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {SPEED_STEPS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSpeedSelect(s)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        Math.abs(speed - s) < 0.02
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Voice saved to device storage</span>
              </div>

              <button
                onClick={() => setShowVoiceModal(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
