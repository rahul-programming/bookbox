import React, { useState, useEffect, useRef } from 'react';
import { Book, UserProgress, UserHabitProfile, ThemeMode, IdeaCard, UserAccount, ReaderViewMode } from './types';
import { 
  db, 
  initDatabase, 
  toggleFavorite, 
  toggleCurrentlyReading, 
  getActiveUser, 
  getActiveUserSession,
  getUserProgressMap, 
  getUserProfile, 
  logout 
} from './db';
import { Header } from './components/Header';
import { NavigationTabs, MainTab } from './components/NavigationTabs';
import { LibraryView } from './components/LibraryView';
import { FavoritesView } from './components/FavoritesView';
import { CurrentlyReadingView } from './components/CurrentlyReadingView';
import { IdeaFeedView } from './components/IdeaFeedView';
import { StashBoardsView } from './components/StashBoardsView';
import { HabitGrowthView } from './components/HabitGrowthView';
import { ReaderView } from './components/ReaderView';
import { StashModal } from './components/StashModal';
import { ImportExportModal } from './components/ImportExportModal';
import { AuthModal } from './components/AuthModal';

interface LastViewState {
  view: 'book' | 'tab';
  bookId?: string;
  viewMode?: ReaderViewMode;
  blinkIndex?: number;
  tab?: MainTab;
}

const LAST_VIEW_KEY = 'bookbox_last_view_state';

const saveLastViewState = (state: LastViewState) => {
  try {
    localStorage.setItem(LAST_VIEW_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to save last view state to localStorage', err);
  }
};

export function App() {
  const [isReady, setIsReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getActiveUserSession());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<MainTab>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [initialReaderViewMode, setInitialReaderViewMode] = useState<ReaderViewMode>('blinks');
  const [initialReaderBlinkIndex, setInitialReaderBlinkIndex] = useState<number>(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>({});
  const [profile, setProfile] = useState<UserHabitProfile | null>(null);
  const [stashedCount, setStashedCount] = useState<number>(0);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(() => {
    const saved = localStorage.getItem('bookbox_font_size');
    return saved !== null ? parseInt(saved, 10) : 1;
  });
  
  // Modals
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [activeStashIdea, setActiveStashIdea] = useState<IdeaCard | null>(null);
  const [homeResetTrigger, setHomeResetTrigger] = useState(0);

  // Sync refs to avoid stale closures in window popstate & unload event listeners
  const selectedBookRef = useRef(selectedBook);
  const activeTabRef = useRef(activeTab);
  const isAuthOpenRef = useRef(isAuthOpen);
  const isBackupOpenRef = useRef(isBackupOpen);
  const activeStashIdeaRef = useRef(activeStashIdea);
  const booksRef = useRef(books);
  const initialReaderViewModeRef = useRef(initialReaderViewMode);
  const currentReaderBlinkIndexRef = useRef(initialReaderBlinkIndex);

  useEffect(() => { selectedBookRef.current = selectedBook; }, [selectedBook]);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);
  useEffect(() => { isAuthOpenRef.current = isAuthOpen; }, [isAuthOpen]);
  useEffect(() => { isBackupOpenRef.current = isBackupOpen; }, [isBackupOpen]);
  useEffect(() => { activeStashIdeaRef.current = activeStashIdea; }, [activeStashIdea]);
  useEffect(() => { booksRef.current = books; }, [books]);
  useEffect(() => { initialReaderViewModeRef.current = initialReaderViewMode; }, [initialReaderViewMode]);
  useEffect(() => { currentReaderBlinkIndexRef.current = initialReaderBlinkIndex; }, [initialReaderBlinkIndex]);

  // Save state on tab hidden / unload
  useEffect(() => {
    const handleSaveCurrentState = () => {
      if (selectedBookRef.current) {
        saveLastViewState({
          view: 'book',
          bookId: selectedBookRef.current.id,
          viewMode: initialReaderViewModeRef.current,
          blinkIndex: currentReaderBlinkIndexRef.current,
          tab: activeTabRef.current
        });
      } else {
        saveLastViewState({
          view: 'tab',
          tab: activeTabRef.current
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleSaveCurrentState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleSaveCurrentState);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleSaveCurrentState);
    };
  }, []);

  // Mobile Hardware / Gesture Back Button & History Stack Management
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;

      // 1. If an active modal was open, close it first
      if (activeStashIdeaRef.current) {
        setActiveStashIdea(null);
        return;
      }
      if (isBackupOpenRef.current) {
        setIsBackupOpen(false);
        return;
      }
      if (isAuthOpenRef.current) {
        setIsAuthOpen(false);
        return;
      }

      // 2. If a book was open
      if (selectedBookRef.current) {
        // If the state we popped to is still a book or sub-view of a book (e.g., exiting voice modal or fullscreen mindmap)
        if (state?.view === 'book' || state?.view === 'mindmap-fullscreen' || state?.modal === 'voice') {
          if (state?.bookId && state.bookId !== selectedBookRef.current.id) {
            const nextBook = booksRef.current.find(b => b.id === state.bookId);
            if (nextBook) {
              setSelectedBook(nextBook);
              saveLastViewState({
                view: 'book',
                bookId: nextBook.id,
                viewMode: 'blinks',
                tab: state?.tab || activeTabRef.current
              });
            }
          }
          return;
        }

        // Otherwise, we popped back out of the book to the previous tab screen!
        setSelectedBook(null);
        const targetTab = state?.tab || 'library';
        setActiveTab(targetTab);
        saveLastViewState({
          view: 'tab',
          tab: targetTab
        });
        refreshData();
        return;
      }

      // 3. If on a secondary tab and popped back
      if (state?.view === 'tab' && state.tab) {
        setActiveTab(state.tab);
        saveLastViewState({
          view: 'tab',
          tab: state.tab
        });
        return;
      } else if (state?.view === 'home' || !state) {
        setActiveTab('library');
        saveLastViewState({
          view: 'tab',
          tab: 'library'
        });
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectBook = (book: Book, initialMode: ReaderViewMode = 'blinks') => {
    window.history.pushState({ view: 'book', bookId: book.id, tab: activeTabRef.current }, '');
    setInitialReaderViewMode(initialMode);
    setSelectedBook(book);
    saveLastViewState({
      view: 'book',
      bookId: book.id,
      viewMode: initialMode,
      blinkIndex: progressMap[book.id]?.currentBlinkIndex ?? 0,
      tab: activeTabRef.current
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReaderViewModeChange = (mode: ReaderViewMode) => {
    setInitialReaderViewMode(mode);
    initialReaderViewModeRef.current = mode;
    if (selectedBookRef.current) {
      saveLastViewState({
        view: 'book',
        bookId: selectedBookRef.current.id,
        viewMode: mode,
        blinkIndex: currentReaderBlinkIndexRef.current,
        tab: activeTabRef.current
      });
    }
  };

  const handleReaderBlinkIndexChange = (index: number) => {
    setInitialReaderBlinkIndex(index);
    currentReaderBlinkIndexRef.current = index;
    if (selectedBookRef.current) {
      saveLastViewState({
        view: 'book',
        bookId: selectedBookRef.current.id,
        viewMode: initialReaderViewModeRef.current,
        blinkIndex: index,
        tab: activeTabRef.current
      });
    }
  };

  const handleBackFromBook = () => {
    saveLastViewState({
      view: 'tab',
      tab: activeTabRef.current
    });
    if (window.history.state?.view === 'book') {
      window.history.back();
    } else {
      setSelectedBook(null);
      refreshData();
    }
  };

  const handleTabChange = (tab: MainTab) => {
    if (tab === activeTabRef.current) return;
    window.history.pushState({ view: 'tab', tab }, '');
    setActiveTab(tab);
    saveLastViewState({
      view: 'tab',
      tab
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleOpenAuth = (mode?: 'login' | 'signup') => {
    setAuthInitialMode(mode || 'login');
    window.history.pushState({ modal: 'auth' }, '');
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    if (window.history.state?.modal === 'auth') {
      window.history.back();
    } else {
      setIsAuthOpen(false);
    }
  };

  const handleOpenBackup = () => {
    window.history.pushState({ modal: 'backup' }, '');
    setIsBackupOpen(true);
  };

  const handleCloseBackup = () => {
    if (window.history.state?.modal === 'backup') {
      window.history.back();
    } else {
      setIsBackupOpen(false);
    }
  };

  const handleOpenStashModal = (idea: IdeaCard) => {
    window.history.pushState({ modal: 'stash' }, '');
    setActiveStashIdea(idea);
  };

  const handleCloseStashModal = () => {
    if (window.history.state?.modal === 'stash') {
      window.history.back();
    } else {
      setActiveStashIdea(null);
    }
  };

  const handleGoHome = () => {
    if (selectedBookRef.current || isBackupOpenRef.current || activeStashIdeaRef.current || isAuthOpenRef.current || activeTabRef.current !== 'library') {
      window.history.pushState({ view: 'home', tab: 'library' }, '');
    }
    setSelectedBook(null);
    setActiveTab('library');
    setIsBackupOpen(false);
    setActiveStashIdea(null);
    setIsAuthOpen(false);
    setHomeResetTrigger(prev => prev + 1);
    saveLastViewState({
      view: 'tab',
      tab: 'library'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshData();
  };

  const handleIncreaseFontSize = () => {
    setFontSizeIndex(prev => {
      const next = Math.min(3, prev + 1);
      localStorage.setItem('bookbox_font_size', String(next));
      return next;
    });
  };

  const handleDecreaseFontSize = () => {
    setFontSizeIndex(prev => {
      const next = Math.max(0, prev - 1);
      localStorage.setItem('bookbox_font_size', String(next));
      return next;
    });
  };

  // Load theme and initialize database
  useEffect(() => {
    const savedTheme = (localStorage.getItem('bookbox_theme') as ThemeMode) || 'light';
    setTheme(savedTheme);
    applyThemeClass(savedTheme);

    const init = async () => {
      await initDatabase();
      const dedupedBooks = await refreshData();

      // Check for saved session state so user resumes exactly where they left off
      let restored = false;
      const savedRaw = localStorage.getItem(LAST_VIEW_KEY);
      if (savedRaw) {
        try {
          const saved: LastViewState = JSON.parse(savedRaw);
          if (saved.view === 'book' && saved.bookId) {
            const foundBook = dedupedBooks.find(b => b.id === saved.bookId);
            if (foundBook) {
              const tab = saved.tab || 'library';
              const mode = saved.viewMode || 'blinks';
              const bIndex = typeof saved.blinkIndex === 'number' ? saved.blinkIndex : 0;

              setActiveTab(tab);
              setInitialReaderViewMode(mode);
              setInitialReaderBlinkIndex(bIndex);
              setSelectedBook(foundBook);

              window.history.replaceState({ view: 'home', tab }, '');
              window.history.pushState({ view: 'book', bookId: foundBook.id, tab }, '');
              restored = true;
            }
          } else if (saved.view === 'tab' && saved.tab) {
            setActiveTab(saved.tab);
            window.history.replaceState({ view: 'tab', tab: saved.tab }, '');
            restored = true;
          }
        } catch (e) {
          console.warn('Failed to parse last view state', e);
        }
      }

      // Fallback: If no explicit saved view state, check if there is an active uncompleted book in progress
      if (!restored) {
        const user = await getActiveUser();
        const pMap = await getUserProgressMap(user ? user.id : null);
        const progressEntries = Object.values(pMap).filter(p => p && p.lastReadTimestamp);
        if (progressEntries.length > 0) {
          progressEntries.sort((a, b) => (b.lastReadTimestamp || 0) - (a.lastReadTimestamp || 0));
          const latest = progressEntries[0];
          const foundBook = dedupedBooks.find(b => b.id === latest.bookId || b.id === latest.actualBookId);
          if (foundBook && !latest.isCompleted) {
            setActiveTab('reading');
            setInitialReaderViewMode('blinks');
            setInitialReaderBlinkIndex(latest.currentBlinkIndex ?? 0);
            setSelectedBook(foundBook);

            window.history.replaceState({ view: 'home', tab: 'reading' }, '');
            window.history.pushState({ view: 'book', bookId: foundBook.id, tab: 'reading' }, '');
            restored = true;
          }
        }
      }

      if (!restored && !window.history.state) {
        window.history.replaceState({ view: 'home', tab: 'library' }, '');
      }

      setIsReady(true);
    };
    init();
  }, []);

  const applyThemeClass = (newTheme: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia');
    if (newTheme === 'dark') root.classList.add('dark');
    if (newTheme === 'sepia') root.classList.add('sepia');
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('bookbox_theme', newTheme);
    applyThemeClass(newTheme);
  };

  const refreshData = async (): Promise<Book[]> => {
    const allBooks = await db.books.toArray();
    // Deduplicate books by normalized title & author (keeping the one with the most content)
    const dedupedBooksMap = new Map<string, Book>();
    for (const b of allBooks) {
      const key = `${b.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}___${b.author.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      const prev = dedupedBooksMap.get(key);
      if (!prev || (b.blinks?.length || 0) > (prev.blinks?.length || 0)) {
        dedupedBooksMap.set(key, b);
      }
    }
    const deduped = Array.from(dedupedBooksMap.values());
    setBooks(deduped);

    const user = await getActiveUser();
    setCurrentUser(user);

    const pMap = await getUserProgressMap(user ? user.id : null);
    setProgressMap(pMap);

    const userProfile = await getUserProfile(user ? user.id : null);
    if (userProfile) setProfile(userProfile);

    const stashedIdeas = await db.ideas.where('isStashed').equals(1).count();
    setStashedCount(stashedIdeas);

    return deduped;
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    saveLastViewState({
      view: 'tab',
      tab: 'library'
    });
    await refreshData();
  };

  const handleAuthSuccess = async (user: UserAccount) => {
    setCurrentUser(user);
    await refreshData();
  };

  const handleToggleFavorite = async (bookId: string) => {
    await toggleFavorite(bookId, currentUser?.id);
    await refreshData();
  };

  const handleToggleCurrentlyReading = async (bookId: string) => {
    await toggleCurrentlyReading(bookId, currentUser?.id);
    await refreshData();
  };

  const favoritesCount = React.useMemo(() => {
    return books.filter(b => progressMap[b.id]?.isFavorite).length;
  }, [books, progressMap]);

  const readingCount = React.useMemo(() => {
    return books.filter(b => {
      const p = progressMap[b.id];
      if (!p) return false;
      return p.isCurrentlyReading === true || (p.isCurrentlyReading !== false && (p.completedBlinkIds?.length ?? 0) > 0 && !p.isCompleted);
    }).length;
  }, [books, progressMap]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 font-medium text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading local library...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased flex flex-col w-full max-w-full overflow-x-hidden">
      
      {/* Top Application Header */}
      <Header
        profile={profile}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        theme={theme}
        onThemeChange={handleThemeChange}
        onOpenBackup={handleOpenBackup}
        onOpenImportBook={handleOpenBackup}
        fontSizeIndex={fontSizeIndex}
        onIncreaseFontSize={handleIncreaseFontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
        onGoHome={handleGoHome}
      />

      {/* Main Content: If a book is selected, open Unified ReaderView; otherwise show Tabs & Dashboard */}
      {selectedBook ? (
        <ReaderView
          book={selectedBook}
          onBack={handleBackFromBook}
          onOpenStashModal={handleOpenStashModal}
          onBookCompleted={() => refreshData()}
          fontSizeIndex={fontSizeIndex}
          initialViewMode={initialReaderViewMode}
          initialBlinkIndex={initialReaderBlinkIndex}
          onViewModeChange={handleReaderViewModeChange}
          onBlinkIndexChange={handleReaderBlinkIndexChange}
        />
      ) : (
        <>
          {/* Main Navigation Tabs */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            stashedCount={stashedCount}
            favoritesCount={favoritesCount}
            readingCount={readingCount}
          />

          {/* Active Tab Screen */}
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            {activeTab === 'library' && (
              <LibraryView
                books={books}
                progressMap={progressMap}
                onSelectBook={handleSelectBook}
                onToggleFavorite={handleToggleFavorite}
                onToggleCurrentlyReading={handleToggleCurrentlyReading}
                resetTrigger={homeResetTrigger}
              />
            )}

            {activeTab === 'favorites' && (
              <FavoritesView
                books={books}
                progressMap={progressMap}
                onSelectBook={handleSelectBook}
                onToggleFavorite={handleToggleFavorite}
                onToggleCurrentlyReading={handleToggleCurrentlyReading}
                onBrowseLibrary={() => handleTabChange('library')}
              />
            )}

            {activeTab === 'reading' && (
              <CurrentlyReadingView
                books={books}
                progressMap={progressMap}
                onSelectBook={handleSelectBook}
                onToggleFavorite={handleToggleFavorite}
                onToggleCurrentlyReading={handleToggleCurrentlyReading}
                onBrowseLibrary={() => handleTabChange('library')}
              />
            )}

            {activeTab === 'ideas' && (
              <IdeaFeedView
                onSelectBook={handleSelectBook}
                onOpenStashModal={handleOpenStashModal}
              />
            )}

            {activeTab === 'stashes' && (
              <StashBoardsView
                onOpenStashModal={handleOpenStashModal}
              />
            )}

            {activeTab === 'growth' && (
              <HabitGrowthView
                profile={profile}
                onProfileUpdated={() => refreshData()}
              />
            )}
          </main>
        </>
      )}

      {/* Stash Idea Modal */}
      {activeStashIdea && (
        <StashModal
          idea={activeStashIdea}
          onClose={handleCloseStashModal}
          onSaved={() => refreshData()}
        />
      )}

      {/* Backup, Restore & Custom Book Modal */}
      {isBackupOpen && (
        <ImportExportModal
          onClose={handleCloseBackup}
          onDataChanged={() => refreshData()}
        />
      )}

      {/* User Auth Modal: Login & Sign Up */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        onSuccess={handleAuthSuccess}
        initialMode={authInitialMode}
      />

    </div>
  );
}

export default App;
