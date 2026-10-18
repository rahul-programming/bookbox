import React from 'react';
import { Blink, Book } from '../../types';
import { Lightbulb, ChevronLeft, ChevronRight, CheckCircle, Volume2 } from 'lucide-react';

interface BlinkistViewProps {
  book: Book;
  currentBlinkIndex: number;
  highlightRange: { start: number; length: number };
  onBlinkChange: (index: number) => void;
  onCompleteBook: () => void;
  onStartAudio: () => void;
  fontSizeClass: string;
}

export const BlinkistView: React.FC<BlinkistViewProps> = ({
  book,
  currentBlinkIndex,
  onBlinkChange,
  onCompleteBook,
  onStartAudio,
  fontSizeClass
}) => {
  const blink = book.blinks[currentBlinkIndex] || book.blinks[0];
  const isFirst = currentBlinkIndex === 0;
  const isLast = currentBlinkIndex === book.blinks.length - 1;

  if (!blink) return null;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8">
      
      {/* Top Blink Stepper & Audio Trigger */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
            Blink {currentBlinkIndex + 1} of {book.blinks.length}
          </span>
          <span className="text-xs text-slate-400">· ~2 min read</span>
        </div>

        <button
          onClick={onStartAudio}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
          title="Listen to this Blink"
        >
          <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Listen</span>
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center space-x-1.5 mb-8">
        {book.blinks.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onBlinkChange(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentBlinkIndex
                ? 'w-8 bg-blue-600 dark:bg-blue-500'
                : idx < currentBlinkIndex
                ? 'w-3 bg-emerald-500'
                : 'w-3 bg-slate-200 dark:bg-slate-700'
            }`}
            title={`Jump to Blink ${idx + 1}`}
          />
        ))}
      </div>

      {/* Blink Headline */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug mb-6">
        {blink.headline}
      </h2>

      {/* Main Content Paragraphs */}
      <div className={`text-slate-700 dark:text-slate-300 space-y-5 leading-relaxed font-serif ${fontSizeClass}`}>
        {blink.content.split('\n\n').map((paragraph, pIdx) => (
          <p key={pIdx}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Key Takeaway Callout Box (Blinkist signature feature) */}
      <div className="my-8 p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 shadow-xs">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-400 font-bold text-sm mb-2">
          <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span>Key Takeaway</span>
        </div>
        <p className="text-sm sm:text-base font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
          {blink.keyTakeaway}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
        <button
          onClick={() => onBlinkChange(currentBlinkIndex - 1)}
          disabled={isFirst}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${
            isFirst
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Blink</span>
        </button>

        {isLast ? (
          <button
            onClick={onCompleteBook}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition transform hover:scale-105 active:scale-95"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Finish Book & Claim Streak</span>
          </button>
        ) : (
          <button
            onClick={() => onBlinkChange(currentBlinkIndex + 1)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition transform hover:scale-105 active:scale-95"
          >
            <span>Next Blink</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
