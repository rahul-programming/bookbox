import React, { useState } from 'react';
import { Book, UserProgress, Category } from '../types';
import { BookCard } from './BookCard';
import { Search, Sparkles, Compass, Flame, Volume2, X } from 'lucide-react';
import { AudioPlayerBar } from './AudioPlayerBar';

interface LibraryViewProps {
  books: Book[];
  progressMap: Record<string, UserProgress>;
  onSelectBook: (book: Book) => void;
  onToggleFavorite?: (bookId: string) => void;
  onToggleCurrentlyReading?: (bookId: string) => void;
  resetTrigger?: number;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  books,
  progressMap,
  onSelectBook,
  onToggleFavorite,
  onToggleCurrentlyReading,
  resetTrigger
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudioBook, setActiveAudioBook] = useState<Book | null>(null);

  // Reset category, subcategory and search when Home is clicked
  React.useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      setSelectedCategory('All');
      setSelectedSubcategory('All');
      setSearchQuery('');
    }
  }, [resetTrigger]);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    books.forEach(b => {
      if (b.category) cats.add(b.category);
    });
    const priorityOrder = ['Productivity', 'Psychology', 'Finance', 'Philosophy', 'Strategy', 'Leadership'];
    const ordered = priorityOrder.filter(c => cats.has(c));
    Array.from(cats).sort().forEach(c => {
      if (!ordered.includes(c)) ordered.push(c);
    });
    return ['All', ...ordered];
  }, [books]);

  // Books in the currently selected category
  const booksInSelectedCategory = React.useMemo(() => {
    if (selectedCategory === 'All') return [];
    return books.filter(b => b.category === selectedCategory);
  }, [books, selectedCategory]);

  // Only show subcategories once a category has more than 5 books
  const subcategories = React.useMemo(() => {
    if (selectedCategory === 'All' || booksInSelectedCategory.length <= 5) return [];

    const subs = new Set<string>();
    booksInSelectedCategory.forEach(b => {
      if (b.subcategory && b.subcategory.trim()) {
        subs.add(b.subcategory.trim());
      } else if (b.tags && b.tags.length > 0) {
        const candidate = b.tags.find(
          t => t.toLowerCase() !== b.category.toLowerCase() && t !== 'Custom'
        );
        if (candidate) subs.add(candidate);
      }
    });

    if (subs.size === 0) return [];
    return ['All', ...Array.from(subs).sort()];
  }, [selectedCategory, booksInSelectedCategory]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory('All');
  };

  const filteredBooks = books.filter(b => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSub =
      selectedSubcategory === 'All' ||
      !subcategories.length ||
      b.subcategory === selectedSubcategory ||
      (b.tags && b.tags.includes(selectedSubcategory));
    const matchSearch =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.subcategory && b.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCat && matchSub && matchSearch;
  });

  const dailyPick = books[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full max-w-full overflow-x-hidden">
      
      {/* Daily Pick Hero Banner */}
      {dailyPick && searchQuery.trim() === '' && selectedCategory === 'All' && (
        <div 
          onClick={() => onSelectBook(dailyPick)}
          className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Today's Daily Pick</span>
              </span>
              <span className="text-xs text-blue-200">15 min read · Listen or read</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight group-hover:text-blue-200 transition-colors">
              {dailyPick.title}
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 font-medium">
              By {dailyPick.author} · {dailyPick.category}
            </p>

            <p className="text-xs sm:text-sm text-blue-100 line-clamp-2 leading-relaxed">
              {dailyPick.onePageSummary.elevatorPitch}
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBook(dailyPick);
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md transition transform hover:scale-105"
              >
                Start 15-min Summary
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveAudioBook(dailyPick);
                }}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 backdrop-blur-md transition"
                title="Listen to summary preview"
              >
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span>Listen Audio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder="Search books, authors, tags..."
            className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setSearchQuery('');
              }}
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 border border-slate-300/80 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-2xs transition-all cursor-pointer z-10"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          )}
        </div>

      </div>

      {/* Subcategory Pills (automatically displayed when category has > 5 books) */}
      {subcategories.length > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar -mt-3 pt-1">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Subcategories ({booksInSelectedCategory.length}):
          </span>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedSubcategory === sub
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-300 dark:border-blue-700 font-semibold shadow-2xs'
                  : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-200/60'
              }`}
            >
              {sub === 'All' ? `All ${selectedCategory}` : sub}
            </button>
          ))}
        </div>
      )}

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="py-16 text-center text-slate-400">
          <p className="text-base font-medium">No books found matching "{searchQuery}"</p>
          <p className="text-xs mt-1">Try clearing your search query or picking a different category.</p>
        </div>
      ) : (
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
      )}

      {/* Floating Audio Player when listening from Library */}
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
