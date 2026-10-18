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
  // Local active index synced with currentBlinkIndex
  const [activeIdx, setActiveIdx] = React.useState<number>(currentBlinkIndex);
  // Target index being navigated to
  const [targetIdx, setTargetIdx] = React.useState<number | null>(null);
  // Transition status: 'idle' | 'swiping' | 'exiting' | 'springing'
  const [transitionStatus, setTransitionStatus] = React.useState<'idle' | 'swiping' | 'exiting' | 'springing'>('idle');
  // Direction: 'left' (next) or 'right' (prev)
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');
  // Live drag offset in pixels
  const [dragOffset, setDragOffset] = React.useState<number>(0);

  // Sync external changes (e.g. from Audio player auto-advancing)
  React.useEffect(() => {
    if (currentBlinkIndex !== activeIdx && transitionStatus === 'idle') {
      const dir = currentBlinkIndex > activeIdx ? 'left' : 'right';
      setDirection(dir);
      setTargetIdx(currentBlinkIndex);
      setTransitionStatus('exiting');

      const t = setTimeout(() => {
        setActiveIdx(currentBlinkIndex);
        setDragOffset(0);
        setTransitionStatus('idle');
        setTargetIdx(null);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [currentBlinkIndex, activeIdx, transitionStatus]);

  const blink = book.blinks[activeIdx] || book.blinks[0];
  const isFirst = activeIdx === 0;
  const isLast = activeIdx === book.blinks.length - 1;

  // Touch gesture tracking
  const touchStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null);
  const touchAxisRef = React.useRef<'horizontal' | 'vertical' | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (transitionStatus !== 'idle') return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
    touchAxisRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || transitionStatus === 'exiting') return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartRef.current.x;
    const deltaY = currentY - touchStartRef.current.y;

    if (!touchAxisRef.current) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        touchAxisRef.current = 'vertical';
        return;
      }
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
        touchAxisRef.current = 'horizontal';
      }
    }

    if (touchAxisRef.current === 'horizontal') {
      let offset = deltaX;
      if (deltaX < 0) {
        // Dragging Left -> Next Card
        setDirection('left');
        setTargetIdx(Math.min(activeIdx + 1, book.blinks.length - 1));
        if (activeIdx === book.blinks.length - 1) {
          offset = deltaX * 0.25; // Rubber-band bounce on last card
        }
      } else if (deltaX > 0) {
        // Dragging Right -> Prev Card
        setDirection('right');
        setTargetIdx(Math.max(activeIdx - 1, 0));
        if (activeIdx === 0) {
          offset = deltaX * 0.25; // Rubber-band bounce on first card
        }
      }
      setDragOffset(offset);
      setTransitionStatus('swiping');
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current) return;
    const deltaX = dragOffset;
    const elapsed = Date.now() - touchStartRef.current.time;
    const velocity = Math.abs(deltaX) / Math.max(1, elapsed);
    const wasHorizontal = touchAxisRef.current === 'horizontal';

    touchStartRef.current = null;
    touchAxisRef.current = null;

    if (!wasHorizontal) {
      setDragOffset(0);
      setTransitionStatus('idle');
      return;
    }

    const threshold = 60;
    const isSwipe = Math.abs(deltaX) > threshold || velocity > 0.35;

    if (isSwipe && deltaX < 0) {
      // Swipe Left -> Next Card
      if (activeIdx < book.blinks.length - 1) {
        setDirection('left');
        setTransitionStatus('exiting');
        setDragOffset(-window.innerWidth || -420);
        setTimeout(() => {
          const nextIdx = activeIdx + 1;
          setActiveIdx(nextIdx);
          onBlinkChange(nextIdx);
          setDragOffset(0);
          setTransitionStatus('idle');
          setTargetIdx(null);
        }, 280);
      } else {
        // Last card swipe left -> Complete book
        setDirection('left');
        setTransitionStatus('exiting');
        setDragOffset(-window.innerWidth || -420);
        setTimeout(() => {
          onCompleteBook();
          setDragOffset(0);
          setTransitionStatus('idle');
          setTargetIdx(null);
        }, 280);
      }
    } else if (isSwipe && deltaX > 0) {
      // Swipe Right -> Prev Card
      if (activeIdx > 0) {
        setDirection('right');
        setTransitionStatus('exiting');
        setDragOffset(window.innerWidth || 420);
        setTimeout(() => {
          const prevIdx = activeIdx - 1;
          setActiveIdx(prevIdx);
          onBlinkChange(prevIdx);
          setDragOffset(0);
          setTransitionStatus('idle');
          setTargetIdx(null);
        }, 280);
      } else {
        // Elastic spring back to center
        setTransitionStatus('springing');
        setDragOffset(0);
        setTimeout(() => {
          setTransitionStatus('idle');
        }, 260);
      }
    } else {
      // Threshold not reached: Elastic spring back to center
      setTransitionStatus('springing');
      setDragOffset(0);
      setTimeout(() => {
        setTransitionStatus('idle');
      }, 260);
    }
  };

  // Programmatic smooth card navigation for Next/Prev buttons & progress dots
  const navigateTo = (newIndex: number, isCompleting = false) => {
    if (transitionStatus !== 'idle') return;
    if (isCompleting) {
      setDirection('left');
      setTransitionStatus('exiting');
      setTimeout(() => {
        onCompleteBook();
        setTransitionStatus('idle');
      }, 280);
      return;
    }
    if (newIndex === activeIdx || newIndex < 0 || newIndex >= book.blinks.length) return;
    const dir = newIndex > activeIdx ? 'left' : 'right';
    setDirection(dir);
    setTargetIdx(newIndex);
    setTransitionStatus('exiting');

    setTimeout(() => {
      setActiveIdx(newIndex);
      onBlinkChange(newIndex);
      setDragOffset(0);
      setTransitionStatus('idle');
      setTargetIdx(null);
    }, 280);
  };

  // Determine underneath card to preview during deck animation
  const underneathIndex = targetIdx !== null 
    ? targetIdx 
    : direction === 'left' 
    ? Math.min(activeIdx + 1, book.blinks.length - 1)
    : Math.max(activeIdx - 1, 0);

  const underneathBlink = book.blinks[underneathIndex] && underneathIndex !== activeIdx
    ? book.blinks[underneathIndex]
    : null;

  // Active top card transform styles
  let topCardTransform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
  let topCardOpacity = 1;
  let topCardTransition = 'none';

  if (transitionStatus === 'swiping') {
    const rotation = dragOffset * 0.035;
    topCardTransform = `translate3d(${dragOffset}px, 0, 0) rotate(${rotation}deg)`;
    topCardOpacity = Math.max(0.7, 1 - Math.abs(dragOffset) / 500);
    topCardTransition = 'none';
  } else if (transitionStatus === 'exiting') {
    const exitX = direction === 'left' ? '-115%' : '115%';
    const exitRot = direction === 'left' ? '-7deg' : '7deg';
    topCardTransform = `translate3d(${exitX}, 0, 0) rotate(${exitRot}) scale(0.95)`;
    topCardOpacity = 0;
    topCardTransition = 'transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.24s ease-out';
  } else if (transitionStatus === 'springing') {
    topCardTransform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
    topCardOpacity = 1;
    topCardTransition = 'transform 0.26s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.26s ease-out';
  }

  // Underneath card transform styles
  let underneathScale = 0.96;
  let underneathTranslateY = 10;
  let underneathOpacity = 0.55;

  if (transitionStatus === 'swiping') {
    const progress = Math.min(1, Math.abs(dragOffset) / 220);
    underneathScale = 0.96 + 0.04 * progress;
    underneathTranslateY = 10 * (1 - progress);
    underneathOpacity = 0.55 + 0.45 * progress;
  } else if (transitionStatus === 'exiting') {
    underneathScale = 1.0;
    underneathTranslateY = 0;
    underneathOpacity = 1.0;
  }

  // Helper to render card content cleanly
  const renderCardContent = (b: Blink, isUnderneath = false) => (
    <div className="space-y-6">
      {/* Insight Headline */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
        {b.headline}
      </h2>

      {/* Main Content Paragraphs */}
      <div className={`text-slate-700 dark:text-slate-300 space-y-5 leading-relaxed font-serif ${fontSizeClass}`}>
        {!isUnderneath && highlightRange.start >= 0 && highlightRange.length > 0 ? (
          <div className="space-y-4">
            <p className="whitespace-pre-line">
              <span>{b.content.slice(0, highlightRange.start)}</span>
              <mark className="bg-amber-200/90 dark:bg-amber-900/60 dark:text-amber-100 text-slate-900 px-1 py-0.5 rounded shadow-xs transition-all duration-200 font-medium">
                {b.content.slice(highlightRange.start, highlightRange.start + highlightRange.length)}
              </mark>
              <span>{b.content.slice(highlightRange.start + highlightRange.length)}</span>
            </p>
          </div>
        ) : (
          b.content.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx}>
              {paragraph}
            </p>
          ))
        )}
      </div>

      {/* Key Takeaway Callout Box */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 shadow-xs">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-400 font-bold text-sm mb-2">
          <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
          <span>Key Takeaway</span>
        </div>
        <p className="text-sm sm:text-base font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
          {b.keyTakeaway}
        </p>
      </div>
    </div>
  );

  if (!blink) return null;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8">
      
      {/* Top Insight Stepper, Top Prev/Next & Audio Trigger (Fixed in Place) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
            Insight {activeIdx + 1} of {book.blinks.length}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">· ~2 min read</span>
        </div>

        {/* Top Prev & Next Navigation Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo(activeIdx - 1)}
            disabled={isFirst || transitionStatus !== 'idle'}
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
              onClick={() => navigateTo(activeIdx, true)}
              disabled={transitionStatus !== 'idle'}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition active:scale-95"
              title="Finish Book"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Finish</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo(activeIdx + 1)}
              disabled={transitionStatus !== 'idle'}
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

      {/* Mobile Swipe Guidance Bar */}
      <div className="flex sm:hidden items-center justify-between text-[11px] text-slate-400 pb-3 px-1">
        <span>👈 Swipe right for Prev</span>
        <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
          Card Deck
        </span>
        <span>Swipe left for Next 👉</span>
      </div>

      {/* Progress Dots with Smooth Navigation */}
      <div className="flex items-center space-x-1.5 mb-6 overflow-x-auto py-1 scrollbar-none">
        {book.blinks.map((_, idx) => (
          <button
            key={idx}
            onClick={() => navigateTo(idx)}
            disabled={transitionStatus !== 'idle'}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeIdx
                ? 'w-8 bg-blue-600 dark:bg-blue-500 shadow-xs'
                : idx < activeIdx
                ? 'w-2.5 bg-emerald-500/80 hover:bg-emerald-500'
                : 'w-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
            title={`Jump to Insight ${idx + 1}`}
          />
        ))}
      </div>

      {/* SWIPABLE CARD DECK CONTAINER: Smoothly animated physical card stack */}
      <div className="relative overflow-hidden py-3 px-1 sm:px-2 select-text">
        
        {/* Background Deck Silhouette Layer 2 (Bottom-most card depth) */}
        <div 
          className="absolute inset-x-3 inset-y-0 bg-slate-100 dark:bg-slate-800/40 rounded-3xl pointer-events-none transition-all duration-300"
          style={{
            transform: 'scale(0.93) translateY(14px)',
            opacity: 0.35,
            border: '1px solid rgba(148, 163, 184, 0.25)'
          }}
        />

        {/* Background Deck Layer 1 (Underneath card with live content) */}
        {underneathBlink && (
          <div 
            className="absolute inset-x-2 inset-y-0 z-0 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md pointer-events-none overflow-hidden"
            style={{
              transform: `scale(${underneathScale}) translateY(${underneathTranslateY}px)`,
              opacity: underneathOpacity,
              transition: transitionStatus === 'swiping' 
                ? 'none' 
                : 'transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.26s ease-out'
            }}
          >
            {renderCardContent(underneathBlink, true)}
          </div>
        )}

        {/* Top Active Interactive Card */}
        <div 
          className="relative z-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/60 will-change-transform touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{
            transform: topCardTransform,
            opacity: topCardOpacity,
            transition: topCardTransition
          }}
        >
          {renderCardContent(blink, false)}
        </div>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
        <button
          onClick={() => navigateTo(activeIdx - 1)}
          disabled={isFirst || transitionStatus !== 'idle'}
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
            onClick={() => navigateTo(activeIdx, true)}
            disabled={transitionStatus !== 'idle'}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition transform hover:scale-105 active:scale-95"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Finish Book & Claim Streak</span>
          </button>
        ) : (
          <button
            onClick={() => navigateTo(activeIdx + 1)}
            disabled={transitionStatus !== 'idle'}
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
