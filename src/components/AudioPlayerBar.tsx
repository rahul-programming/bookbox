import React, { useEffect, useState } from 'react';
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
  Check,
  Sparkles
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
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [sentenceInfo, setSentenceInfo] = useState({ current: 1, total: 1 });

  // Load and sort voices by natural quality
  useEffect(() => {
    const updateVoiceList = () => {
      const vList = speechService.getVoices();
      setVoices(vList);
    };

    updateVoiceList();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoiceList;
    }
  }, []);

  // When active text changes (e.g., user moves to next chapter or switches tabs), start/restart
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

  const cycleSpeed = () => {
    const speeds = [1.0, 1.15, 1.25, 1.5, 1.75, 0.85];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    speechService.setPlaybackRate(nextSpeed);
    setSpeed(nextSpeed);
  };

  const handleVoiceSelect = (v: SpeechSynthesisVoice) => {
    speechService.setVoice(v);
    setShowVoicePicker(false);
    if (isPlaying && !isPaused) {
      const curr = Math.max(0, sentenceInfo.current - 1);
      startPlayback(curr);
    }
  };

  const activeVoice = speechService.getSelectedVoice();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-slate-900/95 dark:bg-slate-950/95 text-white border-t border-slate-700/80 backdrop-blur-lg shadow-2xl transition-all">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
        
        {/* Track Info & Sentence Counter */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying && !isPaused ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 truncate">
              {bookTitle}
            </p>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700">
              Sentence {sentenceInfo.current}/{sentenceInfo.total}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate mt-0.5">
            {activeHeadline}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between sm:justify-center space-x-1 sm:space-x-2">
          
          {/* Replay From Start */}
          <button
            onClick={() => startPlayback(0)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Restart from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Previous Sentence */}
          <button
            onClick={handlePreviousSentence}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Previous Sentence"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={handlePlayToggle}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition transform hover:scale-105 active:scale-95"
            title={isPlaying && !isPaused ? 'Pause' : 'Play Narration'}
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Sentence */}
          <button
            onClick={handleNextSentence}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Next Sentence"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Stop Button */}
          <button
            onClick={handleStop}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Stop Audio"
          >
            <Square className="w-4 h-4" />
          </button>

          {/* Next Item (if provided) */}
          {onNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Next Section"
            >
              <FastForward className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Settings: Speed & Natural Voice Selector */}
        <div className="flex items-center justify-end space-x-2 sm:space-x-3">
          
          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-blue-400 transition border border-slate-700"
            title="Change Narration Speed"
          >
            {speed}x
          </button>

          {/* Voice Selector Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowVoicePicker(!showVoicePicker)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition border border-slate-700"
              title="Voice Settings (Female Natural Voice)"
            >
              <Volume2 className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden md:inline max-w-[120px] truncate text-slate-200 font-medium">
                {activeVoice ? activeVoice.name.replace(/Google/i, '').replace(/\(Female\)/i, '').replace(/🌟/i, '').trim() : 'Natural Voice'}
              </span>
              <span className="text-[10px] text-pink-300 font-bold px-1.5 py-0.2 rounded bg-pink-950/80 border border-pink-700/60">
                ♀ Natural
              </span>
            </button>

            {showVoicePicker && (
              <div className="absolute right-0 bottom-full mb-3 w-72 max-h-80 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-2.5 shadow-2xl z-50 text-xs">
                <div className="px-2 py-1 mb-2 border-b border-slate-700/80 flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>High-Fidelity Voices</span>
                  </span>
                  <span className="text-[10px] text-pink-400 font-semibold">♀ Female first</span>
                </div>
                
                <div className="space-y-1">
                  {voices.map((v, i) => {
                    const isSelected = activeVoice?.name === v.voice.name;
                    return (
                      <button
                        key={i}
                        onClick={() => handleVoiceSelect(v.voice)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs truncate transition flex items-center justify-between ${
                          isSelected 
                            ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/50' 
                            : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 truncate">
                          {v.isFemale && <span className="text-pink-400 text-xs">♀</span>}
                          <span className="truncate">{v.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Close Floating Bar */}
          {onClose && (
            <button
              onClick={() => {
                handleStop();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
