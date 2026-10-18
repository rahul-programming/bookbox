import React from 'react';
import { Blink, Book } from '../../types';
import { Lightbulb, ChevronLeft, ChevronRight, CheckCircle, Volume2 } from 'lucide-react';

interface KeyInsightsViewProps {
  book: Book;
  currentBlinkIndex: number;
  highlightRange: { start: number; length: number };
  onBlinkChange: (index: number) => void;
  onCompleteBook: () => void;
  onStartAudio: () => void;
  fontSizeClass: string;
}

export const KeyInsightsView: React.FC<KeyInsightsViewProps> = ({
  book,
  currentBlinkIndex,
  highlightRange,
  onBlinkChange,
  onCompleteBook,
  onStartAudio,
  fontSizeClass
}) => {
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);
  const [touchStartY, setTouchStartY] = React.useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = React.useState<number>(0);
  const [isSwiping, setIsSwiping] = React.useState<boolean>(false);

  const blink = book.blinks[currentBlinkIndex] || book.blinks[0];
  const isFirst = currentBlinkIndex === 0;
  const isLast = currentBlinkIndex === book.blinks.length - 1;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.touches[0].clientX - touchStartX;
    const deltaY = e.touches[0].clientY - touchStartY;
    // Track horizontal swipe if dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) < 140) {
      setSwipeOffset(deltaX * 0.35);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null && touchStartY !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Minimum swipe distance of 45px and predominantly horizontal
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        if (deltaX < 0) {
          // Swipe Left -> Next Insight
          if (!isLast) {
            onBlinkChange(currentBlinkIndex + 1);
          } else {
            onCompleteBook();
          }
        } else {
          // Swipe Right -> Previous Insight
          if (!isFirst) {
            onBlinkChange(currentBlinkIndex - 1);
          }
        }
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  if (!blink) return null;

  return (
    <div 
      className="max-w-3xl mx-auto py-6 sm:py-8 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        transform: `translateX(${swipeOffset}px)`,
        transition: isSwiping ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      
      {/* Top Insight Stepper, Top Prev/Next & Audio Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
            Insight {currentBlinkIndex + 1} of {book.blinks.length}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">· ~2 min read</span>
        </div>

        {/* Top Prev & Next Navigation Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onBlinkChange(currentBlinkIndex - 1)}
            disabled={isFirst}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isFirst
                ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs'
            }`}
            title="Previous Insight"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {isLast ? (
            <button
              onClick={onCompleteBook}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition"
              title="Finish Book"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Finish</span>
            </button>
          ) : (
            <button
              onClick={() => onBlinkChange(currentBlinkIndex + 1)}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs transition"
              title="Next Insight"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onStartAudio}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
            title="Listen to this Insight"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Listen</span>
          </button>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex sm:hidden items-center justify-between text-[11px] text-slate-400 pb-2 px-1">
        <span>👈 Swipe right for Prev</span>
        <span className="font-medium text-blue-500/80">Swipable</span>
        <span>Swipe left for Next 👉</span>
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
            title={`Jump to Insight ${idx + 1}`}
          />
        ))}
      </div>

      {/* Insight Headline */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug mb-6">
        {blink.headline}
      </h2>

      {/* Main Content Paragraphs */}
      <div className={`text-slate-700 dark:text-slate-300 space-y-5 leading-relaxed font-serif ${fontSizeClass}`}>
        {highlightRange.start >= 0 && highlightRange.length > 0 ? (
          <div className="space-y-4">
            <p className="whitespace-pre-line">
              <span>{blink.content.slice(0, highlightRange.start)}</span>
              <mark className="bg-amber-200/90 dark:bg-amber-900/60 dark:text-amber-100 text-slate-900 px-1 py-0.5 rounded shadow-xs transition-all duration-200 font-medium">
                {blink.content.slice(highlightRange.start, highlightRange.start + highlightRange.length)}
              </mark>
              <span>{blink.content.slice(highlightRange.start + highlightRange.length)}</span>
            </p>
          </div>
        ) : (
          blink.content.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx}>
              {paragraph}
            </p>
          ))
        )}
      </div>

      {/* Key Takeaway Callout Box */}
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
          <span>Previous Insight</span>
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
            <span>Next Insight</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};

