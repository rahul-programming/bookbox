import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Book, PerformancePiece } from '../../types';
import {
  MapPin,
  Mic,
  Volume2,
  Clock,
  Eye,
  PauseCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Search,
  Copy,
  Check,
  AlertTriangle,
  Theater,
  SlidersHorizontal,
  ArrowRightCircle,
  List
} from 'lucide-react';

interface PerformanceReaderViewProps {
  book: Book;
  currentIndex: number;
  onPieceChange: (index: number) => void;
  onCompleteBook: () => void;
  onStartAudio: (headline: string, text: string) => void;
  fontSizeClass: string;
  highlightRange: { start: number; length: number };
}

/** Parses stage markup tokens like [PAUSE 1.5s], [BEAT], [EMPHASIS: text], [LOWER VOICE] */
function renderAnnotatedLine(line: string, lineKey: string): React.ReactNode[] {
  const tokenRegex = /(\[[^\]]+\])/g;
  const parts = line.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith('[') && part.endsWith(']')) {
      const inner = part.slice(1, -1).trim();
      const upper = inner.toUpperCase();

      // [EMPHASIS: phrase]
      if (upper.startsWith('EMPHASIS:')) {
        const stressedText = inner.slice(9).trim();
        return (
          <span
            key={`${lineKey}-${idx}`}
            className="inline font-extrabold text-amber-900 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-900/45 px-1.5 py-0.5 rounded underline decoration-amber-500 decoration-2 underline-offset-4 mx-0.5"
            title="Vocal Emphasis"
          >
            {stressedText}
          </span>
        );
      }

      // [PAUSE ...] or [BEAT]
      if (upper.startsWith('PAUSE') || upper === 'BEAT' || upper.startsWith('BEAT:')) {
        return (
          <span
            key={`${lineKey}-${idx}`}
            className="inline-flex items-center space-x-1 px-2 py-0.5 mx-1 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-[11px] font-bold uppercase tracking-wider align-middle select-none"
          >
            <PauseCircle className="w-3 h-3" />
            <span>{inner}</span>
          </span>
        );
      }

      // Stage / vocal direction tags ([LOWER VOICE], [DEADPAN], [SMILE], [LEAN IN], etc.)
      return (
        <span
          key={`${lineKey}-${idx}`}
          className="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold uppercase tracking-wide align-middle select-none"
        >
          {inner}
        </span>
      );
    }

    return <React.Fragment key={`${lineKey}-${idx}`}>{part}</React.Fragment>;
  });
}

function renderCleanWithHighlight(
  cleanText: string,
  highlightRange: { start: number; length: number }
): React.ReactNode {
  if (highlightRange.start < 0 || highlightRange.length <= 0) {
    return cleanText.split(/\n+/).map((p, i) => (
      <p key={i} className="mb-4 last:mb-0">
        {p}
      </p>
    ));
  }

  const start = highlightRange.start;
  const end = start + highlightRange.length;
  const before = cleanText.slice(0, start);
  const highlighted = cleanText.slice(start, end);
  const after = cleanText.slice(end);

  return (
    <div className="whitespace-pre-line">
      {before}
      <mark className="bg-amber-200 dark:bg-amber-700/60 text-slate-900 dark:text-white rounded px-1 py-0.5">
        {highlighted}
      </mark>
      {after}
    </div>
  );
}

export const PerformanceReaderView: React.FC<PerformanceReaderViewProps> = ({
  book,
  currentIndex,
  onPieceChange,
  onCompleteBook,
  onStartAudio,
  fontSizeClass,
  highlightRange
}) => {
  const pieces = book.performancePieces || [];
  const total = pieces.length;
  const safeIndex = Math.min(Math.max(0, currentIndex), Math.max(0, total - 1));
  const piece: PerformancePiece | undefined = pieces[safeIndex];

  const [showStageCues, setShowStageCues] = useState(true);
  const [showNavigator, setShowNavigator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isHorizontalIntentRef = useRef<boolean | null>(null);

  const isFirst = safeIndex === 0;
  const isLast = safeIndex === total - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        if (!isLast) onPieceChange(safeIndex + 1);
        else onCompleteBook();
      } else if (e.key === 'ArrowLeft') {
        if (!isFirst) onPieceChange(safeIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, isFirst, isLast, onPieceChange, onCompleteBook]);

  const filteredIndexList = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return pieces
      .map((p, idx) => ({ piece: p, idx }))
      .filter(({ piece: p }) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.usageContext.primaryTrigger.toLowerCase().includes(q) ||
          p.usageContext.situations.some(s => s.toLowerCase().includes(q)) ||
          p.cleanScript.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      });
  }, [pieces, searchTerm]);

  const handleCopyScript = async () => {
    if (!piece) return;
    const text = `${piece.usageContext.bridgeIn}\n\n${piece.cleanScript}\n\n${piece.usageContext.bridgeOut}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(piece.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback ignored in restricted clipboard contexts
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    startTimeRef.current = Date.now();
    isHorizontalIntentRef.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null || startYRef.current === null) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const deltaY = e.touches[0].clientY - startYRef.current;

    if (isHorizontalIntentRef.current === null) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        isHorizontalIntentRef.current = false;
        return;
      }
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
        isHorizontalIntentRef.current = true;
      }
    }

    if (isHorizontalIntentRef.current) {
      let offset = deltaX;
      if ((isFirst && deltaX > 0) || (isLast && deltaX < 0)) {
        offset = deltaX * 0.25;
      }
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - startXRef.current;
    const elapsed = Date.now() - startTimeRef.current;
    const velocity = Math.abs(deltaX) / Math.max(1, elapsed);
    const wasHorizontal = isHorizontalIntentRef.current === true;

    startXRef.current = null;
    startYRef.current = null;
    isHorizontalIntentRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (wasHorizontal && (Math.abs(deltaX) > 70 || velocity > 0.45)) {
      if (deltaX < 0 && !isLast) {
        onPieceChange(safeIndex + 1);
      } else if (deltaX > 0 && !isFirst) {
        onPieceChange(safeIndex - 1);
      }
    }
  };

  if (!piece) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center text-slate-500">
        No stories or jokes found in this volume.
      </div>
    );
  }

  const isJoke = piece.type === 'joke';
  const durationLabel = piece.spokenDurationSeconds < 60
    ? `${piece.spokenDurationSeconds}s delivery`
    : `${Math.round(piece.spokenDurationSeconds / 60 * 10) / 10} min delivery`;

  return (
    <div
      className="max-w-4xl mx-auto pt-4 sm:pt-6 pb-16 select-text"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: isDragging && dragOffset !== 0 ? `translateX(${dragOffset * 0.3}px)` : undefined,
        transition: isDragging ? 'none' : 'transform 200ms ease-out'
      }}
    >
      {/* Performer Toolbar: Counter, Stage Cue Toggle, Index Drawer */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
              isJoke
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            }`}
          >
            {isJoke ? 'Joke / Bit' : 'Story'} {safeIndex + 1} of {total}
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{durationLabel}</span>
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Toggle Stage Cues vs Clean Text */}
          <button
            type="button"
            onClick={() => setShowStageCues(prev => !prev)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              showStageCues
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Theater className="w-3.5 h-3.5" />
            <span>{showStageCues ? 'Stage Cues: ON' : 'Clean Script'}</span>
          </button>

          {/* Search / Situation Jump Drawer */}
          <button
            type="button"
            onClick={() => setShowNavigator(prev => !prev)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              showNavigator
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Browse All {total}</span>
          </button>

          {/* Rehearse Audio */}
          <button
            type="button"
            onClick={() => onStartAudio(piece.title, piece.cleanScript)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold transition cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Rehearse</span>
          </button>
        </div>
      </div>

      {/* Collapsible Index / Situation Finder Drawer */}
      {showNavigator && (
        <div className="mb-8 rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 p-4 shadow-md space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search situations, triggers, or keywords across ${total} pieces...`}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/70 pr-1">
            {filteredIndexList.map(({ piece: p, idx }) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onPieceChange(idx);
                  setShowNavigator(false);
                }}
                className={`w-full text-left py-2.5 px-3 rounded-lg transition flex items-start justify-between gap-3 cursor-pointer ${
                  idx === safeIndex
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    #{idx + 1} · {p.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    Use when: {p.usageContext.primaryTrigger}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 shrink-0 mt-0.5">
                  {p.spokenDurationSeconds}s
                </span>
              </button>
            ))}
            {filteredIndexList.length === 0 && (
              <p className="py-6 text-center text-xs text-slate-400">
                No matching situations found for "{searchTerm}".
              </p>
            )}
          </div>
        </div>
      )}

      {/* PIECE TITLE */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5">
        {piece.title}
      </h1>

      {/* 1. TOP "WHERE TO USE IT" SPOTLIGHT CARD */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border border-amber-200/90 dark:border-amber-800/60 p-5 sm:p-6 mb-6 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Where to Use This {isJoke ? 'Joke' : 'Story'}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5 leading-snug">
                {piece.usageContext.primaryTrigger}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyScript}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 shrink-0 transition cursor-pointer"
            title="Copy bridge-in + script + bridge-out"
          >
            {copiedId === piece.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy Bit</span>
              </>
            )}
          </button>
        </div>

        {/* Situation Trigger Chips */}
        <div className="flex flex-wrap gap-2">
          {piece.usageContext.situations.map((sit, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-amber-200/80 dark:border-slate-700"
            >
              • {sit}
            </span>
          ))}
        </div>

        {/* Audience Fit & Exact Bridge-In Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="rounded-xl bg-white/80 dark:bg-slate-800/70 border border-amber-200/60 dark:border-slate-700/80 p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              How to Segue In (Say First)
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 mt-1 italic">
              "{piece.usageContext.bridgeIn}"
            </p>
          </div>

          <div className="rounded-xl bg-white/80 dark:bg-slate-800/70 border border-amber-200/60 dark:border-slate-700/80 p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Best Audience & Room Vibe
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                {piece.usageContext.audienceVibe}
              </p>
            </div>
            {piece.usageContext.avoidWhen && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-2 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                <span>Avoid when: {piece.usageContext.avoidWhen}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. DELIVERY & VERBAL BLUEPRINT */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 p-5 mb-6 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Pro Performer Delivery Blueprint</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/70">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              <Mic className="w-3.5 h-3.5 text-blue-500" />
              <span>Pace & Energy</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {piece.deliveryCues.pacingAndEnergy}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/70">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              <Volume2 className="w-3.5 h-3.5 text-purple-500" />
              <span>Vocal Tone & Shifts</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {piece.deliveryCues.vocalTone}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/70">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              <PauseCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Timing & Pause Beats</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {piece.deliveryCues.pauseBeats}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/70">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              <Eye className="w-3.5 h-3.5 text-emerald-500" />
              <span>Body & Eye Contact</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {piece.deliveryCues.physicalAndEyeContact}
            </p>
          </div>
        </div>

        {/* Vocal Emphasis Targets */}
        {piece.deliveryCues.keyEmphasisPhrases.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Hit Hard Vocally:
            </span>
            {piece.deliveryCues.keyEmphasisPhrases.map((phrase, i) => (
              <span
                key={i}
                className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300/70 dark:border-amber-800"
              >
                "{phrase}"
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. ANNOTATED OR CLEAN PERFORMANCE SCRIPT */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/70">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {showStageCues ? 'Annotated Performance Script' : 'Clean Reading Script'}
          </span>
          {showStageCues && (
            <div className="hidden sm:flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-bold underline decoration-amber-500">
                Emphasis
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold">
                Pause / Beat
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold">
                Tone Cue
              </span>
            </div>
          )}
        </div>

        <div className={`${fontSizeClass} font-serif text-slate-800 dark:text-slate-100 space-y-4`}>
          {showStageCues
            ? piece.annotatedScript.split(/\n+/).map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {renderAnnotatedLine(paragraph, `p-${pIdx}`)}
                </p>
              ))
            : renderCleanWithHighlight(piece.cleanScript, highlightRange)}
        </div>
      </div>

      {/* 4. TIE-BACK, RECOVERY & COMEDIC / NARRATIVE ANATOMY */}
      <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-800/60 p-5 mb-6 space-y-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <ArrowRightCircle className="w-4 h-4" />
            <span>Bridge-Out / Land the Point</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 italic">
            "{piece.usageContext.bridgeOut}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/70 dark:border-emerald-800/50 text-xs">
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider">
              Follow-Up Tag / Room Recovery:
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              {piece.craftBreakdown.payoffOrTag}
            </p>
          </div>
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider">
              Why It Lands:
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              {piece.craftBreakdown.whyItLands}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 text-xs">
          <div>
            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              Setup Mechanics:
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5">{piece.craftBreakdown.setupSummary}</p>
          </div>
          <div>
            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px]">
              The Turn / Misdirection:
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5">{piece.craftBreakdown.turnOrMisdirection}</p>
          </div>
        </div>
      </div>

      {/* BOTTOM PREV / NEXT NAVIGATION */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onPieceChange(safeIndex - 1)}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
            isFirst
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs font-semibold text-slate-400">
          {safeIndex + 1} / {total}
        </span>

        {!isLast ? (
          <button
            type="button"
            onClick={() => onPieceChange(safeIndex + 1)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
          >
            <span>Next {isJoke ? 'Joke' : 'Story'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onCompleteBook}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Complete Volume</span>
          </button>
        )}
      </div>
    </div>
  );
};
