import React, { useState, useEffect } from 'react';
import { Book, UserProgress, UserHabitProfile, ThemeMode, IdeaCard } from './types';
import { db, initDatabase } from './db';
import { Header } from './components/Header';
import { NavigationTabs, MainTab } from './components/NavigationTabs';
import { LibraryView } from './components/LibraryView';
import { IdeaFeedView } from './components/IdeaFeedView';
import { StashBoardsView } from './components/StashBoardsView';
import { HabitGrowthView } from './components/HabitGrowthView';
import { ReaderView } from './components/ReaderView';
import { StashModal } from './components/StashModal';
import { ImportExportModal } from './components/ImportExportModal';

export function App() {
  const [isReady, setIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState<MainTab>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>({});
  const [profile, setProfile] = useState<UserHabitProfile | null>(null);
  const [stashedCount, setStashedCount] = useState<number>(0);
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  // Modals
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [activeStashIdea, setActiveStashIdea] = useState<IdeaCard | null>(null);

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
    setBooks(allBooks);

    const allProgress = await db.progress.toArray();
    const pMap: Record<string, UserProgress> = {};
    allProgress.forEach(p => {
      pMap[p.bookId] = p;
    });
    setProgressMap(pMap);

    const userProfile = await db.profile.get('active_profile');
    if (userProfile) setProfile(userProfile);

    const stashedIdeas = await db.ideas.where('isStashed').equals(1).count();
    setStashedCount(stashedIdeas);
  };

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased flex flex-col">
      
      {/* Top Application Header */}
      <Header
        profile={profile}
        theme={theme}
        onThemeChange={handleThemeChange}
        onOpenBackup={() => setIsBackupOpen(true)}
        onOpenImportBook={() => setIsBackupOpen(true)}
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
        />
      ) : (
        <>
          {/* Main Navigation Tabs */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            stashedCount={stashedCount}
          />

          {/* Active Tab Screen */}
          <main className="flex-1">
            {activeTab === 'library' && (
              <LibraryView
                books={books}
                progressMap={progressMap}
                onSelectBook={(book) => setSelectedBook(book)}
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

    </div>
  );
}

export default App;
