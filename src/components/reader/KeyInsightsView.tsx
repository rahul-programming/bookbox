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
  const [dragOffset, setDragOffset] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const startXRef = React.useRef<number | null>(null);
  const startYRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number>(0);
  const isHorizontalIntentRef = React.useRef<boolean | null>(null);

  const total = book.blinks.length;
  const isFirst = currentBlinkIndex === 0;
  const isLast = currentBlinkIndex === total - 1;
  const currentBlink = book.blinks[currentBlinkIndex] || book.blinks[0];

  // Keyboard navigation (Arrow keys)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        if (!isLast) onBlinkChange(currentBlinkIndex + 1);
        else onCompleteBook();
      } else if (e.key === 'ArrowLeft') {
        if (!isFirst) onBlinkChange(currentBlinkIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentBlinkIndex, isFirst, isLast, onBlinkChange, onCompleteBook]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    startTimeRef.current = Date.now();
    isHorizontalIntentRef.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null || startYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    // Detect gesture direction
    if (isHorizontalIntentRef.current === null) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        // Vertical page scroll detected -> do not intercept
        isHorizontalIntentRef.current = false;
        return;
      }
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
        isHorizontalIntentRef.current = true;
      }
    }

    if (isHorizontalIntentRef.current) {
      let offset = deltaX;
      // Damping resistance at track boundaries
      if (currentBlinkIndex === 0 && deltaX > 0) {
        offset = deltaX * 0.25;
      } else if (currentBlinkIndex === total - 1 && deltaX < 0) {
        offset = deltaX * 0.25;
      }
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startXRef.current;
    const elapsed = Date.now() - startTimeRef.current;
    const velocity = Math.abs(deltaX) / Math.max(1, elapsed);
    const wasHorizontal = isHorizontalIntentRef.current === true;

    startXRef.current = null;
    startYRef.current = null;
    isHorizontalIntentRef.current = null;

    if (wasHorizontal) {
      const threshold = 45;
      const isQuickFlick = velocity > 0.35 && Math.abs(deltaX) > 20;

      if (deltaX < -threshold || (isQuickFlick && deltaX < 0)) {
        // Swipe Left -> Next Insight Card
        if (!isLast) {
          onBlinkChange(currentBlinkIndex + 1);
        } else {
          onCompleteBook();
        }
      } else if (deltaX > threshold || (isQuickFlick && deltaX > 0)) {
        // Swipe Right -> Previous Insight Card
        if (!isFirst) {
          onBlinkChange(currentBlinkIndex - 1);
        }
      }
    }

    setDragOffset(0);
    setIsDragging(false);
  };

  // Mouse drag handling (for desktop & trackpad testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTimeRef.current = Date.now();
    isHorizontalIntentRef.current = null;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startXRef.current === null) return;
    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - (startYRef.current || 0);

    if (isHorizontalIntentRef.current === null) {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
        isHorizontalIntentRef.current = true;
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        isHorizontalIntentRef.current = false;
        return;
      }
    }

    if (isHorizontalIntentRef.current) {
      let offset = deltaX;
      if (currentBlinkIndex === 0 && deltaX > 0) {
        offset = deltaX * 0.25;
      } else if (currentBlinkIndex === total - 1 && deltaX < 0) {
        offset = deltaX * 0.25;
      }
      setDragOffset(offset);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (startXRef.current === null) return;
    const deltaX = e.clientX - startXRef.current;
    const elapsed = Date.now() - startTimeRef.current;
    const velocity = Math.abs(deltaX) / Math.max(1, elapsed);
    const wasHorizontal = isHorizontalIntentRef.current === true;

    startXRef.current = null;
    startYRef.current = null;
    isHorizontalIntentRef.current = null;

    if (wasHorizontal) {
      const threshold = 45;
      const isQuickFlick = velocity > 0.35 && Math.abs(deltaX) > 20;

      if (deltaX < -threshold || (isQuickFlick && deltaX < 0)) {
        if (!isLast) onBlinkChange(currentBlinkIndex + 1);
        else onCompleteBook();
      } else if (deltaX > threshold || (isQuickFlick && deltaX > 0)) {
        if (!isFirst) onBlinkChange(currentBlinkIndex - 1);
      }
    }

    setDragOffset(0);
    setIsDragging(false);
  };

  if (!currentBlink) return null;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 w-full max-w-full overflow-hidden">
      
      {/* Top Insight Stepper, Top Prev/Next & Audio Trigger (Stationary Header) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
            Insight {currentBlinkIndex + 1} of {total}
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
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs active:scale-95'
            }`}
            title="Previous Insight"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {isLast ? (
            <button
              onClick={onCompleteBook}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition active:scale-95"
              title="Finish Book"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Finish</span>
            </button>
          ) : (
            <button
              onClick={() => onBlinkChange(currentBlinkIndex + 1)}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs transition active:scale-95"
              title="Next Insight"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onStartAudio}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition active:scale-95"
            title="Listen to this Insight"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Listen</span>
          </button>
        </div>
      </div>

      {/* Swipe Guidance Pill */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 px-1">
        <span>👈 Swipe right for Prev</span>
        <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-900/60">
          Card {currentBlinkIndex + 1} of {total}
        </span>
        <span>Swipe left for Next 👉</span>
      </div>

      {/* Progress Dots with Smooth Navigation */}
      <div className="flex items-center space-x-1.5 mb-6 overflow-x-auto py-1 scrollbar-none">
        {book.blinks.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onBlinkChange(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentBlinkIndex
                ? 'w-8 bg-blue-600 dark:bg-blue-500 shadow-xs'
                : idx < currentBlinkIndex
                ? 'w-2.5 bg-emerald-500/80 hover:bg-emerald-500'
                : 'w-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
            title={`Jump to Insight ${idx + 1}`}
          />
        ))}
      </div>

      {/* ANIMATED CARD CAROUSEL TRACK: Smoothly sliding cards with 3D elevation */}
      <div 
        className="relative overflow-hidden py-3 select-text touch-pan-y cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="flex w-full items-start will-change-transform min-w-0"
          style={{
            transform: `translate3d(calc(-${currentBlinkIndex * 100}% + ${dragOffset}px), 0, 0)`,
            transition: isDragging 
              ? 'none' 
              : 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {book.blinks.map((blink, idx) => {
            const isCurrent = idx === currentBlinkIndex;
            return (
              <div 
                key={blink.id || idx}
                className="w-full shrink-0 px-1 sm:px-2 transition-all duration-300 min-w-0 max-w-full"
                style={{
                  transform: isCurrent && dragOffset !== 0
                    ? `scale(1) rotate(${dragOffset * 0.018}deg)`
                    : isCurrent
                    ? 'scale(1) rotate(0deg)'
                    : 'scale(0.96) rotate(0deg)',
                  opacity: isCurrent ? 1 : 0.45
                }}
              >
                {/* Physical Card Container with Shadow & Border */}
                <div className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/60 space-y-5 sm:space-y-6 min-w-0 break-words overflow-hidden">
                  
                  {/* Insight Headline */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug break-words">
                    {blink.headline}
                  </h2>

                  {/* Key Takeaway Callout Box (Positioned at the Top) */}
                  {blink.keyTakeaway && (
                    <div className="p-3.5 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 shadow-xs min-w-0 break-words">
                      <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        <span>Key Takeaway</span>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base font-medium text-amber-950 dark:text-amber-200 leading-relaxed break-words">
                        {blink.keyTakeaway}
                      </p>
                    </div>
                  )}

                  {/* Main Content Paragraphs (Prefers Short, Punchy keyInsight; falls back to content) */}
                  <div className={`text-slate-700 dark:text-slate-300 space-y-3.5 sm:space-y-5 leading-relaxed font-serif break-words min-w-0 ${fontSizeClass}`}>
                    {(() => {
                      const text = blink.keyInsight || blink.content;
                      if (isCurrent && highlightRange.start >= 0 && highlightRange.length > 0) {
                        return (
                          <div className="space-y-3.5 sm:space-y-5 min-w-0 break-words">
                            <p className="whitespace-pre-wrap leading-relaxed break-words">
                              <span>{text.slice(0, highlightRange.start)}</span>
                              <mark className="bg-amber-200/90 dark:bg-amber-900/60 dark:text-amber-100 text-slate-900 px-1 py-0.5 rounded shadow-xs transition-all duration-200 font-medium">
                                {text.slice(highlightRange.start, highlightRange.start + highlightRange.length)}
                              </mark>
                              <span>{text.slice(highlightRange.start + highlightRange.length)}</span>
                            </p>
                          </div>
                        );
                      }
                      return text.split('\n\n').map((paragraph, pIdx) => {
                        // Format inline typography: clean quotes and render bold terms properly
                        let cleaned = paragraph.replace(/\*\*"([^"]+)"\*\*/g, '"$1"');
                        const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={pIdx} className="leading-relaxed break-words">
                            {parts.map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                const inner = part.slice(2, -2);
                                if (inner.includes('"') || inner.includes("'") || inner.length > 25) {
                                  return <span key={i}>"{inner.replace(/^["']|["']$/g, '')}"</span>;
                                }
                                return <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">{inner}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      });
                    })()}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
        <button
          onClick={() => onBlinkChange(currentBlinkIndex - 1)}
          disabled={isFirst}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${
            isFirst
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95'
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
