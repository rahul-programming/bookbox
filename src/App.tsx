import React, { useState, useEffect, useRef } from 'react';
import { Book, UserProgress, UserHabitProfile, ThemeMode, IdeaCard, UserAccount } from './types';
import { 
  db, 
  initDatabase, 
  toggleFavorite, 
  toggleCurrentlyReading, 
  getActiveUser, 
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

export function App() {
  const [isReady, setIsReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<MainTab>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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

  // Sync refs to avoid stale closures in window popstate event listener
  const selectedBookRef = useRef(selectedBook);
  const activeTabRef = useRef(activeTab);
  const isAuthOpenRef = useRef(isAuthOpen);
  const isBackupOpenRef = useRef(isBackupOpen);
  const activeStashIdeaRef = useRef(activeStashIdea);
  const booksRef = useRef(books);

  useEffect(() => { selectedBookRef.current = selectedBook; }, [selectedBook]);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);
  useEffect(() => { isAuthOpenRef.current = isAuthOpen; }, [isAuthOpen]);
  useEffect(() => { isBackupOpenRef.current = isBackupOpen; }, [isBackupOpen]);
  useEffect(() => { activeStashIdeaRef.current = activeStashIdea; }, [activeStashIdea]);
  useEffect(() => { booksRef.current = books; }, [books]);

  // Mobile Hardware / Gesture Back Button & History Stack Management
  useEffect(() => {
    // Ensure initial entry has a known state
    if (!window.history.state) {
      window.history.replaceState({ view: 'home', tab: 'library' }, '');
    }

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
            if (nextBook) setSelectedBook(nextBook);
          }
          return;
        }

        // Otherwise, we popped back out of the book to the previous tab screen!
        setSelectedBook(null);
        if (state?.tab) {
          setActiveTab(state.tab);
        }
        refreshData();
        return;
      }

      // 3. If on a secondary tab and popped back
      if (state?.view === 'tab' && state.tab) {
        setActiveTab(state.tab);
        return;
      } else if (state?.view === 'home' || !state) {
        setActiveTab('library');
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectBook = (book: Book) => {
    window.history.pushState({ view: 'book', bookId: book.id, tab: activeTabRef.current }, '');
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackFromBook = () => {
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
      await refreshData();
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

  const refreshData = async () => {
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
    setBooks(Array.from(dedupedBooksMap.values()));

    const user = await getActiveUser();
    setCurrentUser(user);

    const pMap = await getUserProgressMap(user ? user.id : null);
    setProgressMap(pMap);

    const userProfile = await getUserProfile(user ? user.id : null);
    if (userProfile) setProfile(userProfile);

    const stashedIdeas = await db.ideas.where('isStashed').equals(1).count();
    setStashedCount(stashedIdeas);
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
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
