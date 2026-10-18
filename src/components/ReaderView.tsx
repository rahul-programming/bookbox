import React, { useState, useEffect } from 'react';
import { Book, ReaderViewMode, UserProgress, IdeaCard } from '../types';
import { db } from '../db';
import { BlinkistView } from './reader/BlinkistView';
import { ShortformView } from './reader/ShortformView';
import { DeepstashView } from './reader/DeepstashView';
import { StoryShotsView } from './reader/StoryShotsView';
import { AudioPlayerBar } from './AudioPlayerBar';
import { 
  ArrowLeft, 
  Zap, 
  FileText, 
  Sparkles, 
  Network, 
  Type, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReaderViewProps {
  book: Book;
  onBack: () => void;
  onOpenStashModal: (idea: IdeaCard) => void;
  onBookCompleted: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  book,
  onBack,
  onOpenStashModal,
  onBookCompleted
}) => {
  const [viewMode, setViewMode] = useState<ReaderViewMode>('blinks');
  const [currentBlinkIndex, setCurrentBlinkIndex] = useState(0);
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // 0=small, 1=normal, 2=large, 3=xlarge
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [highlightRange, setHighlightRange] = useState({ start: -1, length: 0 });

  const fontClasses = [
    'text-sm leading-relaxed',
    'text-base leading-relaxed',
    'text-lg leading-loose',
    'text-xl leading-loose'
  ];

  // Load or initialize progress
  useEffect(() => {
    const loadProgress = async () => {
      const existing = await db.progress.get(book.id);
      if (existing) {
        setCurrentBlinkIndex(Math.min(existing.currentBlinkIndex, book.blinks.length - 1));
      } else {
        const newProg: UserProgress = {
          bookId: book.id,
          completedBlinkIds: [],
          currentBlinkIndex: 0,
          isCompleted: false,
          lastReadTimestamp: Date.now(),
          totalTimeSpentSeconds: 0
        };
        await db.progress.put(newProg);
      }
    };
    loadProgress();
  }, [book.id, book.blinks.length]);

  // Track active reading time every 30s
  useEffect(() => {
    const interval = setInterval(async () => {
      const profile = await db.profile.get('active_profile');
      if (profile) {
        profile.todayMinutesRead += 0.5;
        await db.profile.put(profile);
      }
      const prog = await db.progress.get(book.id);
      if (prog) {
        prog.totalTimeSpentSeconds += 30;
        prog.lastReadTimestamp = Date.now();
        await db.progress.put(prog);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [book.id]);

  const handleBlinkChange = async (newIndex: number) => {
    if (newIndex < 0 || newIndex >= book.blinks.length) return;
    setCurrentBlinkIndex(newIndex);

    const blink = book.blinks[newIndex];
    const prog = await db.progress.get(book.id);
    if (prog) {
      if (!prog.completedBlinkIds.includes(blink.id)) {
        prog.completedBlinkIds.push(blink.id);
      }
      prog.currentBlinkIndex = newIndex;
      await db.progress.put(prog);
    }
  };

  const handleCompleteBook = async () => {
    const prog = await db.progress.get(book.id);
    if (prog) {
      prog.isCompleted = true;
      prog.completedBlinkIds = book.blinks.map(b => b.id);
      await db.progress.put(prog);
    }

    const profile = await db.profile.get('active_profile');
    if (profile) {
      profile.totalBooksCompleted += 1;
      profile.dailyStreak += 1;
      await db.profile.put(profile);
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onBookCompleted();
  };

  const cycleFontSize = () => {
    setFontSizeIndex((prev) => (prev + 1) % fontClasses.length);
  };

  const activeBlink = book.blinks[currentBlinkIndex] || book.blinks[0];

  return (
    <div className="min-h-screen pb-28 bg-slate-50 dark:bg-slate-900 transition-colors">
      
      {/* Reader Top Sticky Bar */}
      <div className="sticky top-16 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Back button & book title */}
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Back to Library"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="truncate">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {book.title}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {book.author}
              </p>
            </div>
          </div>

          {/* 4-View Mode Segmented Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            
            <button
              onClick={() => setViewMode('blinks')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'blinks'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Blinkist Mode: 15-min audio-synced blinks"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Blinks</span>
            </button>

            <button
              onClick={() => setViewMode('deepdive')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'deepdive'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Shortform Mode: 1-Page summary, analysis, exercises"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deep Dive</span>
            </button>

            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Deepstash Mode: Swipeable idea cards"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>

            <button
              onClick={() => setViewMode('mindmap')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'mindmap'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="StoryShots Mode: Concept mind map"
            >
              <Network className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mind Map</span>
            </button>

          </div>

          {/* Right Controls: Font Sizer & Finish */}
          <div className="flex items-center space-x-2">
            <button
              onClick={cycleFontSize}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-bold flex items-center space-x-1"
              title="Change Font Size"
            >
              <Type className="w-4 h-4" />
              <span className="text-[10px]">{fontSizeIndex + 1}</span>
            </button>

            <button
              onClick={handleCompleteBook}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition"
              title="Mark as Completed"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complete</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {viewMode === 'blinks' && (
          <BlinkistView
            book={book}
            currentBlinkIndex={currentBlinkIndex}
            highlightRange={highlightRange}
            onBlinkChange={handleBlinkChange}
            onCompleteBook={handleCompleteBook}
            onStartAudio={() => setIsAudioActive(true)}
            fontSizeClass={fontClasses[fontSizeIndex]}
          />
        )}

        {viewMode === 'deepdive' && (
          <ShortformView
            book={book}
            fontSizeClass={fontClasses[fontSizeIndex]}
          />
        )}

        {viewMode === 'cards' && (
          <DeepstashView
            book={book}
            onOpenStashModal={onOpenStashModal}
          />
        )}

        {viewMode === 'mindmap' && (
          <StoryShotsView
            book={book}
          />
        )}
      </div>

      {/* Floating Audio Narration Bar */}
      {isAudioActive && activeBlink && (
        <AudioPlayerBar
          bookTitle={book.title}
          activeHeadline={activeBlink.headline}
          activeText={activeBlink.audioSnippetText || activeBlink.content}
          onSentenceHighlight={(start, len) => setHighlightRange({ start, length: len })}
          onNext={() => handleBlinkChange(currentBlinkIndex + 1)}
          onClose={() => setIsAudioActive(false)}
        />
      )}

    </div>
  );
};
