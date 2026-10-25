import React, { useState, useEffect } from 'react';
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
        onOpenAuth={(mode) => {
          setAuthInitialMode(mode || 'login');
          setIsAuthOpen(true);
        }}
        onLogout={handleLogout}
        theme={theme}
        onThemeChange={handleThemeChange}
        onOpenBackup={() => setIsBackupOpen(true)}
        onOpenImportBook={() => setIsBackupOpen(true)}
        fontSizeIndex={fontSizeIndex}
        onIncreaseFontSize={handleIncreaseFontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
        onGoHome={() => {
          setSelectedBook(null);
          setActiveTab('library');
          setIsBackupOpen(false);
          setActiveStashIdea(null);
          setHomeResetTrigger(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          refreshData();
        }}
      />

      {/* Main Content: If a book is selected, open Unified ReaderView; otherwise show Tabs & Dashboard */}
      {selectedBook ? (
        <ReaderView
          book={selectedBook}
          onBack={() => {
            setSelectedBook(null);
            refreshData();
          }}
          onOpenStashModal={(idea) => setActiveStashIdea(idea)}
          onBookCompleted={() => refreshData()}
          fontSizeIndex={fontSizeIndex}
        />
      ) : (
        <>
          {/* Main Navigation Tabs */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
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
                onSelectBook={(book) => setSelectedBook(book)}
                onToggleFavorite={handleToggleFavorite}
                onToggleCurrentlyReading={handleToggleCurrentlyReading}
                resetTrigger={homeResetTrigger}
              />
            )}

            {activeTab === 'favorites' && (
              <FavoritesView
                books={books}
                progressMap={progressMap}
                onSelectBook={(book) => setSelectedBook(book)}
                onToggleFavorite={handleToggleFavorite}
                onToggleCurrentlyReading={handleToggleCurrentlyReading}
                onBrowseLibrary={() => setActiveTab('library')}
              />
            )}

            {activeTab === 'reading' && (
              <CurrentlyReadingView
                books={books}
                progressMap={progressMap}
                onSelectBook={(book) => setSelectedBook(book)}
                onToggleFavorite={handleToggleFavorite}
                onToggleCurrentlyReading={handleToggleCurrentlyReading}
                onBrowseLibrary={() => setActiveTab('library')}
              />
            )}

            {activeTab === 'ideas' && (
              <IdeaFeedView
                onSelectBook={(book) => setSelectedBook(book)}
                onOpenStashModal={(idea) => setActiveStashIdea(idea)}
              />
            )}

            {activeTab === 'stashes' && (
              <StashBoardsView
                onOpenStashModal={(idea) => setActiveStashIdea(idea)}
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
          onClose={() => setActiveStashIdea(null)}
          onSaved={() => refreshData()}
        />
      )}

      {/* Backup, Restore & Custom Book Modal */}
      {isBackupOpen && (
        <ImportExportModal
          onClose={() => setIsBackupOpen(false)}
          onDataChanged={() => refreshData()}
        />
      )}

      {/* User Auth Modal: Login & Sign Up */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authInitialMode}
      />

    </div>
  );
}

export default App;
