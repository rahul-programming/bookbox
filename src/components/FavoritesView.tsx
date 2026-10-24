import React, { useState } from 'react';
import { Book, UserProgress } from '../types';
import { BookCard } from './BookCard';
import { Heart, Search, X, Sparkles, BookMarked, Plus } from 'lucide-react';
import { AudioPlayerBar } from './AudioPlayerBar';

interface FavoritesViewProps {
  books: Book[];
  progressMap: Record<string, UserProgress>;
  onSelectBook: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
  onToggleCurrentlyReading: (bookId: string) => void;
  onBrowseLibrary: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  books,
  progressMap,
  onSelectBook,
  onToggleFavorite,
  onToggleCurrentlyReading,
  onBrowseLibrary
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudioBook, setActiveAudioBook] = useState<Book | null>(null);

  const favoriteBooks = React.useMemo(() => {
    return books.filter(b => progressMap[b.id]?.isFavorite);
  }, [books, progressMap]);

  const favoriteBookIds = React.useMemo(() => new Set(favoriteBooks.map(b => b.id)), [favoriteBooks]);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    favoriteBooks.forEach(b => {
      if (b.category) cats.add(b.category);
    });
    return ['All', ...Array.from(cats).sort()];
  }, [favoriteBooks]);

  const filteredBooks = favoriteBooks.filter(b => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.subcategory && b.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCat && matchSearch;
  });

  // Library books matching search that aren't yet favorited
  const libraryAddMatches = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return books.filter(b => {
      if (favoriteBookIds.has(b.id)) return false;
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q)) ||
        (b.subcategory && b.subcategory.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [books, favoriteBookIds, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full max-w-full overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Favorite Books
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {favoriteBooks.length === 0
              ? 'Star your favorite summaries and deep dives for quick reference.'
              : `${favoriteBooks.length} ${favoriteBooks.length === 1 ? 'book' : 'books'} saved to your personal shelf.`}
          </p>
        </div>

        {/* Search Input (Always visible) */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search favorites or library..."
            className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills if more than 1 category */}
      {favoriteBooks.length > 0 && categories.length > 2 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Favorite Books Grid */}
      {filteredBooks.length > 0 && (
        <div className="space-y-4">
          {searchQuery && (
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              In Your Favorites ({filteredBooks.length})
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                progress={progressMap[book.id]}
                onSelect={onSelectBook}
                onStartAudio={(b) => setActiveAudioBook(b)}
                onToggleFavorite={onToggleFavorite}
                onToggleCurrentlyReading={onToggleCurrentlyReading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Library Matches to Star into Favorites */}
      {searchQuery.trim() !== '' && libraryAddMatches.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add from Library to Favorites ({libraryAddMatches.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Click heart icon to star</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryAddMatches.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                progress={progressMap[book.id]}
                onSelect={onSelectBook}
                onStartAudio={(b) => setActiveAudioBook(b)}
                onToggleFavorite={onToggleFavorite}
                onToggleCurrentlyReading={onToggleCurrentlyReading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {favoriteBooks.length === 0 && !searchQuery && (
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60 flex items-center justify-center text-rose-500 shadow-sm animate-pulse">
            <Heart className="w-8 h-8 fill-rose-500/20 stroke-rose-500 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              No Favorite Books Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              When browsing the library, tap the heart icon on any book to pin it here for instant review, quick quotes, and ongoing reference.
            </p>
          </div>
          <button
            onClick={onBrowseLibrary}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition transform hover:scale-105 cursor-pointer"
          >
            <BookMarked className="w-4 h-4" />
            <span>Browse All Books in Library</span>
          </button>
        </div>
      )}

      {/* When searching but no matches */}
      {searchQuery && filteredBooks.length === 0 && libraryAddMatches.length === 0 && (
        <div className="py-16 text-center text-slate-400">
          <p className="text-base font-medium">No books match "{searchQuery}"</p>
          <p className="text-xs mt-1">Try another keyword or author name.</p>
        </div>
      )}

      {/* Floating Audio Player */}
      {activeAudioBook && (
        <AudioPlayerBar
          bookTitle={activeAudioBook.title}
          activeHeadline={`Summary Overview · ${activeAudioBook.title}`}
          activeText={`The 1-Page Summary of ${activeAudioBook.title} by ${activeAudioBook.author}. ${activeAudioBook.onePageSummary.elevatorPitch}. Central thesis: ${activeAudioBook.onePageSummary.coreThesis}. Key conceptual pillars: ${activeAudioBook.onePageSummary.keyPillars.join('. ')}`}
          onClose={() => setActiveAudioBook(null)}
        />
      )}
    </div>
  );
};
