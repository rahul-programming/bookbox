import React, { useState, useEffect } from 'react';
import { Book, ReaderViewMode, UserProgress, IdeaCard } from '../types';
import { 
  db, 
  saveUserProgress, 
  toggleFavorite, 
  toggleCurrentlyReading, 
  getUserProgressMap, 
  getUserProfile, 
  saveUserProfile, 
  getActiveUserId 
} from '../db';
import { KeyInsightsView } from './reader/KeyInsightsView';
import { DeepDiveView } from './reader/DeepDiveView';
import { ActionItemsView } from './reader/ActionItemsView';
import { IdeaCardsView } from './reader/IdeaCardsView';
import { MindMapView } from './reader/MindMapView';
import { AudioPlayerBar } from './AudioPlayerBar';
import { 
  ArrowLeft, 
  Zap, 
  FileText, 
  ListChecks,
  Sparkles, 
  Network, 
  Type, 
  CheckCircle2,
  Volume2,
  Heart,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReaderViewProps {
  book: Book;
  onBack: () => void;
  onOpenStashModal: (idea: IdeaCard) => void;
  onBookCompleted: () => void;
  fontSizeIndex?: number;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  book,
  onBack,
  onOpenStashModal,
  onBookCompleted,
  fontSizeIndex = 1
}) => {
  const [viewMode, setViewMode] = useState<ReaderViewMode>('blinks');
  const [currentBlinkIndex, setCurrentBlinkIndex] = useState(0);
  const [completedActionIds, setCompletedActionIds] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCurrentlyReading, setIsCurrentlyReading] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [highlightRange, setHighlightRange] = useState({ start: -1, length: 0 });
  const [audioTrack, setAudioTrack] = useState<{ headline: string; text: string }>({
    headline: '',
    text: ''
  });

  const fontClasses = [
    'text-sm leading-relaxed',
    'text-base leading-relaxed',
    'text-lg leading-loose',
    'text-xl leading-loose'
  ];

  // Load or initialize progress
  useEffect(() => {
    const loadProgress = async () => {
      const uid = getActiveUserId();
      const pMap = await getUserProgressMap(uid);
      const existing = pMap[book.id];
      if (existing) {
        setCurrentBlinkIndex(Math.min(existing.currentBlinkIndex, Math.max(0, book.blinks.length - 1)));
        setCompletedActionIds(existing.completedActionIds || []);
        setIsFavorite(!!existing.isFavorite);
        setIsCurrentlyReading(existing.isCurrentlyReading ?? true);
      } else {
        await saveUserProgress(book.id, {
          completedBlinkIds: [],
          currentBlinkIndex: 0,
          isCompleted: false,
          lastReadTimestamp: Date.now(),
          totalTimeSpentSeconds: 0,
          completedActionIds: [],
          isFavorite: false,
          isCurrentlyReading: true
        });
        setIsCurrentlyReading(true);
      }
    };
    loadProgress();
  }, [book.id, book.blinks.length]);

  const handleToggleFavorite = async () => {
    const next = await toggleFavorite(book.id);
    setIsFavorite(next);
  };

  const handleToggleCurrentlyReading = async () => {
    const next = await toggleCurrentlyReading(book.id);
    setIsCurrentlyReading(next);
  };

  const handleToggleAction = async (actionId: string) => {
    const next = completedActionIds.includes(actionId)
      ? completedActionIds.filter(id => id !== actionId)
      : [...completedActionIds, actionId];
    
    setCompletedActionIds(next);
    await saveUserProgress(book.id, { completedActionIds: next });
  };

  const activeBlink = book.blinks[currentBlinkIndex] || book.blinks[0];

  // Set default audio track to current blink on mount
  useEffect(() => {
    if (activeBlink) {
      setAudioTrack({
        headline: activeBlink.headline,
        text: activeBlink.content
      });
    }
  }, [book.id]);

  const handleStartAudio = (headline: string, text: string) => {
    setAudioTrack({ headline, text });
    setIsAudioActive(true);
  };

  const handleBlinkChange = async (newIndex: number) => {
    if (newIndex >= 0 && newIndex < book.blinks.length) {
      setCurrentBlinkIndex(newIndex);
      const targetBlink = book.blinks[newIndex];
      
      // If audio is actively playing, automatically update audio to the next blink
      if (isAudioActive && targetBlink) {
        handleStartAudio(targetBlink.headline, targetBlink.content);
      }

      // Persist progress to user storage
      const uid = getActiveUserId();
      const pMap = await getUserProgressMap(uid);
      const existing = pMap[book.id];
      const completed = new Set(existing?.completedBlinkIds || []);
      if (activeBlink) completed.add(activeBlink.id);

      await saveUserProgress(book.id, {
        currentBlinkIndex: newIndex,
        completedBlinkIds: Array.from(completed),
        lastReadTimestamp: Date.now()
      });
    }
  };

  const handleCompleteBook = async () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    await saveUserProgress(book.id, {
      isCompleted: true,
      lastReadTimestamp: Date.now()
    });

    // Update habit streak in profile
    const uid = getActiveUserId();
    const profile = await getUserProfile(uid);
    if (profile) {
      profile.totalBooksCompleted += 1;
      profile.todayMinutesRead += 15;
      await saveUserProfile(profile, uid);
    }

    onBookCompleted();
  };

  // Universal Listen button for the current active tab
  const handleUniversalListen = () => {
    if (viewMode === 'blinks' && activeBlink) {
      handleStartAudio(activeBlink.headline, activeBlink.content);
    } else if (viewMode === 'deepdive') {
      const s = book.onePageSummary;
      const text = s.executiveSummary || `${s.elevatorPitch}\n\n${s.coreThesis}`;
      handleStartAudio(`1-Page Master Summary · ${book.title}`, text);
    } else if (viewMode === 'actionable') {
      const items = book.actionItems || [];
      if (items.length > 0) {
        handleStartAudio(items[0].title, items[0].description);
      }
    } else if (viewMode === 'cards') {
      db.ideas.where('bookId').equals(book.id).toArray().then(ideas => {
        const pool = (ideas.length > 0 ? ideas : book.ideaCards) || [];
        if (pool.length > 0) {
          const card = pool[0];
          handleStartAudio(card.headline, card.body);
        }
      });
    } else if (viewMode === 'mindmap') {
      const root = book.mindMap;
      const branches = root.children ? root.children.map(c => c.label).join(', ') : '';
      const text = `${book.title} Concept Mind Map. ${root.label}. ${root.description || ''}. Primary branches: ${branches}.`;
      handleStartAudio(`Concept Map · ${book.title}`, text);
    }
  };

  return (
    <div className="flex-1 pb-32 w-full max-w-full overflow-x-hidden">
      
      {/* Sticky Reader Sub-Header */}
      <div className="sticky top-16 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md transition-colors w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0 overflow-x-auto no-scrollbar">
          
          {/* Back button & Book Info */}
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
              title="Key Insights: 15-min audio-synced chapters"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Key Insights</span>
            </button>

            <button
              onClick={() => setViewMode('deepdive')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'deepdive'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Deep Dive: 1-Page summary, chapter breakdowns, exercises"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deep Dive</span>
            </button>

            <button
              onClick={() => setViewMode('actionable')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'actionable'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Action Items: Concrete implementation checklist and protocols"
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Action Plan</span>
            </button>

            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Idea Cards: Bite-sized mental models and quotes"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Idea Cards</span>
            </button>

            <button
              onClick={() => setViewMode('mindmap')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'mindmap'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Mind Map: Visual knowledge graph and concept hierarchy"
            >
              <Network className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mind Map</span>
            </button>

          </div>

          {/* Right Controls: Favorite, Reading, Universal Listen & Finish */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Favorite Toggle Button */}
            <button
              onClick={handleToggleFavorite}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1 transition cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-rose-500 hover:bg-rose-50/50'
              }`}
              title={isFavorite ? "Favorited (Click to remove)" : "Add to Favorites"}
              aria-label={isFavorite ? "Favorited" : "Add to Favorites"}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden lg:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            {/* Currently Reading Toggle Button */}
            <button
              onClick={handleToggleCurrentlyReading}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1 transition cursor-pointer ${
                isCurrentlyReading
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              title={isCurrentlyReading ? "In Reading Queue (Click to remove)" : "Add to Currently Reading"}
              aria-label={isCurrentlyReading ? "Reading" : "Add to Currently Reading"}
            >
              <BookOpen className={`w-3.5 h-3.5 ${isCurrentlyReading ? 'text-blue-600' : ''}`} />
              <span className="hidden lg:inline">{isCurrentlyReading ? 'Reading' : 'Queue'}</span>
            </button>

            {/* Universal Audio Listen Button */}
            <button
              onClick={handleUniversalListen}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs font-semibold transition"
              title="Listen to current view with natural female voice"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span className="hidden sm:inline">Listen</span>
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        {viewMode === 'blinks' && (
          <KeyInsightsView
            book={book}
            currentBlinkIndex={currentBlinkIndex}
            highlightRange={highlightRange}
            onBlinkChange={handleBlinkChange}
            onCompleteBook={handleCompleteBook}
            onStartAudio={() => handleStartAudio(activeBlink.headline, activeBlink.keyInsight || activeBlink.content)}
            fontSizeClass={fontClasses[fontSizeIndex]}
          />
        )}

        {viewMode === 'deepdive' && (
          <DeepDiveView
            book={book}
            fontSizeClass={fontClasses[fontSizeIndex]}
            onStartAudio={handleStartAudio}
            highlightRange={highlightRange}
            activeAudioHeadline={audioTrack.headline}
            isAudioActive={isAudioActive}
          />
        )}

        {viewMode === 'actionable' && (
          <ActionItemsView
            book={book}
            completedActionIds={completedActionIds}
            onToggleAction={handleToggleAction}
            onStartAudio={handleStartAudio}
            fontSizeClass={fontClasses[fontSizeIndex]}
            highlightRange={highlightRange}
            activeAudioHeadline={audioTrack.headline}
            isAudioActive={isAudioActive}
          />
        )}

        {viewMode === 'cards' && (
          <IdeaCardsView
            book={book}
            onOpenStashModal={onOpenStashModal}
            onStartAudio={handleStartAudio}
            fontSizeClass={fontClasses[fontSizeIndex]}
            highlightRange={highlightRange}
            activeAudioHeadline={audioTrack.headline}
            isAudioActive={isAudioActive}
          />
        )}

        {viewMode === 'mindmap' && (
          <MindMapView
            book={book}
            onStartAudio={handleStartAudio}
            fontSizeIndex={fontSizeIndex}
          />
        )}
      </div>

      {/* Floating Audio Narration Bar - Active across all tabs */}
      {isAudioActive && (
        <AudioPlayerBar
          bookTitle={book.title}
          activeHeadline={audioTrack.headline}
          activeText={audioTrack.text}
          onSentenceHighlight={(start, len) => setHighlightRange({ start, length: len })}
          onNext={() => {
            if (viewMode === 'blinks' && currentBlinkIndex < book.blinks.length - 1) {
              handleBlinkChange(currentBlinkIndex + 1);
            }
          }}
          onClose={() => setIsAudioActive(false)}
        />
      )}

    </div>
  );
};
