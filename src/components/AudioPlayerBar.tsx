import React, { useEffect, useState } from 'react';
import { Play, Pause, Square, Volume2, RotateCcw, FastForward, X } from 'lucide-react';
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

  useEffect(() => {
    setVoices(speechService.getVoices());
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      speechService.resume();
    } else {
      speechService.play(
        activeText,
        (charIndex, charLength) => {
          if (onSentenceHighlight) onSentenceHighlight(charIndex, charLength);
        },
        () => {
          setIsPlaying(false);
          setIsPaused(false);
          if (onNext) onNext();
        },
        (playing, paused) => {
          setIsPlaying(playing);
          setIsPaused(paused);
        }
      );
    }
  };

  const handlePause = () => {
    speechService.pause();
  };

  const handleStop = () => {
    speechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
    if (onSentenceHighlight) onSentenceHighlight(-1, 0);
  };

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 1.75, 2.0, 0.75];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    speechService.setPlaybackRate(nextSpeed);
    setSpeed(nextSpeed);
    
    // If actively playing, restart with new rate
    if (isPlaying && !isPaused) {
      handlePlay();
    }
  };

  const handleVoiceSelect = (v: SpeechSynthesisVoice) => {
    speechService.setVoice(v);
    setShowVoicePicker(false);
    if (isPlaying) {
      handlePlay();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-slate-900/95 dark:bg-slate-950/95 text-white border-t border-slate-700/80 backdrop-blur-lg shadow-2xl transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 truncate">
              {bookTitle}
            </p>
          </div>
          <p className="text-sm font-medium text-slate-100 truncate">
            {activeHeadline}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Replay */}
          <button
            onClick={handlePlay}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Restart Narration"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Button */}
          {isPlaying && !isPaused ? (
            <button
              onClick={handlePause}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition transform hover:scale-105 active:scale-95"
              title="Pause"
            >
              <Pause className="w-5 h-5 fill-current" />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition transform hover:scale-105 active:scale-95"
              title="Play Audio Narration"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </button>
          )}

          {/* Stop Button */}
          <button
            onClick={handleStop}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Stop Audio"
          >
            <Square className="w-4 h-4" />
          </button>

          {/* Next Blink (if provided) */}
          {onNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Next Blink"
            >
              <FastForward className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Settings: Speed & Voices */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-blue-400 transition"
            title="Change Audio Speed"
          >
            {speed}x
          </button>

          {/* Voice Selector Trigger */}
          {voices.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowVoicePicker(!showVoicePicker)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Voice Settings"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {showVoicePicker && (
                <div className="absolute right-0 bottom-full mb-3 w-56 max-h-60 overflow-y-auto rounded-xl bg-slate-800 border border-slate-700 p-2 shadow-2xl z-50 text-xs">
                  <p className="font-semibold text-slate-400 mb-2 px-2">Natural Voices</p>
                  {voices.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => handleVoiceSelect(v.voice)}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-700 text-slate-200 truncate transition"
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

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
