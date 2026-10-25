import React, { useState } from 'react';
import { Book, UserProgress } from '../types';
import { BookCard } from './BookCard';
import { BookOpen, Search, X, PlayCircle, BookMarked, Plus, Sparkles, Check } from 'lucide-react';
import { AudioPlayerBar } from './AudioPlayerBar';

interface CurrentlyReadingViewProps {
  books: Book[];
  progressMap: Record<string, UserProgress>;
  onSelectBook: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
  onToggleCurrentlyReading: (bookId: string) => void;
  onBrowseLibrary: () => void;
}

export const CurrentlyReadingView: React.FC<CurrentlyReadingViewProps> = ({
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

  const readingBooks = React.useMemo(() => {
    return books
      .filter(b => {
        const p = progressMap[b.id];
        if (!p) return false;
        return p.isCurrentlyReading === true || (p.isCurrentlyReading !== false && (p.completedBlinkIds?.length ?? 0) > 0 && !p.isCompleted);
      })
      .sort((a, b) => (progressMap[b.id]?.lastReadTimestamp || 0) - (progressMap[a.id]?.lastReadTimestamp || 0));
  }, [books, progressMap]);

  const readingBookIds = React.useMemo(() => new Set(readingBooks.map(b => b.id)), [readingBooks]);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    readingBooks.forEach(b => {
      if (b.category) cats.add(b.category);
    });
    return ['All', ...Array.from(cats).sort()];
  }, [readingBooks]);

  const filteredBooks = readingBooks.filter(b => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.subcategory && b.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCat && matchSearch;
  });

  // Library books matching search that aren't yet in reading rotation
  const libraryAddMatches = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return books.filter(b => {
      if (readingBookIds.has(b.id)) return false;
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q)) ||
        (b.subcategory && b.subcategory.toLowerCase().includes(q)) ||
        b.category.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [books, readingBookIds, searchQuery]);

  // Suggested starters when queue is empty
  const suggestedStarters = React.useMemo(() => {
    if (readingBooks.length > 0) return [];
    return books.slice(0, 4);
  }, [books, readingBooks.length]);

  const mostRecent = readingBooks[0] || null;
  const mostRecentProgress = mostRecent ? progressMap[mostRecent.id] : null;
  const mostRecentPercent = mostRecent && mostRecent.blinks.length > 0 
    ? Math.round(((mostRecentProgress?.completedBlinkIds.length ?? 0) / mostRecent.blinks.length) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full max-w-full overflow-x-hidden">
      {/* Header Banner with Always-Visible Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Currently Reading
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {readingBooks.length === 0
              ? 'Keep your active reading queue focused and track your ongoing chapters.'
              : `${readingBooks.length} ${readingBooks.length === 1 ? 'book' : 'books'} currently in your active rotation.`}
          </p>
        </div>

        {/* Search Bar (Always visible) */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search current or find books to add..."
            className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs placeholder:text-slate-400"
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

      {/* Continue Reading Top Highlight Banner when not searching */}
      {mostRecent && searchQuery.trim() === '' && selectedCategory === 'All' && (
        <div 
          onClick={() => onSelectBook(mostRecent)}
          className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 p-6 sm:p-7 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-200">
                <PlayCircle className="w-4 h-4 text-blue-300 animate-pulse" />
                <span>Resume Reading</span>
                <span>·</span>
                <span>{mostRecent.category}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold group-hover:text-blue-100 transition-colors">
                {mostRecent.title}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 line-clamp-1">
                By {mostRecent.author} — {mostRecent.onePageSummary.elevatorPitch}
              </p>
              
              <div className="pt-2 flex items-center space-x-3">
                <div className="w-36 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(5, mostRecentPercent)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-blue-100">
                  {mostRecentPercent}% completed ({mostRecentProgress?.completedBlinkIds.length ?? 0}/{mostRecent.blinks.length} chapters)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBook(mostRecent);
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs sm:text-sm shadow-md transition transform hover:scale-105"
              >
                Jump Back In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Pills (if multiple categories) */}
      {readingBooks.length > 0 && categories.length > 2 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Currently Reading Books Grid */}
      {filteredBooks.length > 0 && (
        <div className="space-y-4">
          {searchQuery && (
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              In Your Reading Queue ({filteredBooks.length})
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

      {/* Available Library Matches to Add to Currently Reading */}
      {searchQuery.trim() !== '' && libraryAddMatches.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add from Library to Currently Reading ({libraryAddMatches.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Click card or Add to start reading</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryAddMatches.map((book) => (
              <div key={book.id} className="relative group">
                <BookCard
                  book={book}
                  progress={progressMap[book.id]}
                  onSelect={onSelectBook}
                  onStartAudio={(b) => setActiveAudioBook(b)}
                  onToggleFavorite={onToggleFavorite}
                  onToggleCurrentlyReading={onToggleCurrentlyReading}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State when queue is empty */}
      {readingBooks.length === 0 && (
        <div className="py-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 flex items-center justify-center text-blue-500 shadow-sm animate-pulse">
            <BookOpen className="w-8 h-8 stroke-blue-500 stroke-[1.75]" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Your Reading Queue is Empty
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Use the search bar above to find any book and click the book icon to add it, or pick from our suggested starters below.
            </p>
          </div>

          {/* Suggested Starters Grid */}
          {suggestedStarters.length > 0 && !searchQuery && (
            <div className="space-y-3 pt-2 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center">
                Suggested Starters
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedStarters.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 shadow-xs flex items-center justify-between gap-3 cursor-pointer group transition"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`w-10 h-12 rounded-lg bg-gradient-to-br ${book.coverColor} flex items-center justify-center text-lg shrink-0`}>
                        {book.coverEmoji}
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600">
                          {book.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          {book.author} · {book.readingTimeMinutes}m
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCurrentlyReading(book.id);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-semibold shrink-0 transition flex items-center space-x-1"
                      title="Add to Currently Reading"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Start</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onBrowseLibrary}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md transition transform hover:scale-105 cursor-pointer"
          >
            <BookMarked className="w-4 h-4" />
            <span>Browse All Books in Library</span>
          </button>
        </div>
      )}

      {/* When searching but neither current nor library books match */}
      {searchQuery && filteredBooks.length === 0 && libraryAddMatches.length === 0 && (
        <div className="py-16 text-center text-slate-400">
          <p className="text-base font-medium">No books match "{searchQuery}"</p>
          <p className="text-xs mt-1">Try another title, author, or keyword, or clear your search.</p>
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
