import React, { useState } from 'react';
import { Book, UserProgress, Category } from '../types';
import { BookCard } from './BookCard';
import { Search, Sparkles, Compass, Flame } from 'lucide-react';

interface LibraryViewProps {
  books: Book[];
  progressMap: Record<string, UserProgress>;
  onSelectBook: (book: Book) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  books,
  progressMap,
  onSelectBook
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Productivity', 'Psychology', 'Finance', 'Philosophy'];

  const filteredBooks = books.filter(b => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCat && matchSearch;
  });

  const dailyPick = books[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
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
              <button className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md transition transform group-hover:scale-105">
                Start 15-min Summary
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

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, authors, tags..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>

      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="py-20 text-center text-slate-400 bg-white dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          <Compass className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-50" />
          <p className="font-semibold text-sm">No summaries found</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting another category or clear your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              progress={progressMap[book.id]}
              onSelect={onSelectBook}
            />
          ))}
        </div>
      )}

    </div>
  );
};

