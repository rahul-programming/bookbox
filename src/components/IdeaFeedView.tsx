import React, { useState, useEffect } from 'react';
import { IdeaCard, Category, Book } from '../types';
import { db } from '../db';
import { Search, Sparkles, RotateCw, Bookmark, Check, BookOpen, Quote } from 'lucide-react';

interface IdeaFeedViewProps {
  onSelectBook: (book: Book) => void;
  onOpenStashModal: (idea: IdeaCard) => void;
}

export const IdeaFeedView: React.FC<IdeaFeedViewProps> = ({ onSelectBook, onOpenStashModal }) => {
  const [ideas, setIdeas] = useState<IdeaCard[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Productivity', 'Psychology', 'Finance', 'Philosophy'];

  const loadAllIdeas = async () => {
    let query = db.ideas.toCollection();
    let result = await query.toArray();

    if (selectedCategory !== 'All') {
      result = result.filter(i => i.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        i =>
          i.headline.toLowerCase().includes(q) ||
          i.body.toLowerCase().includes(q) ||
          i.bookTitle.toLowerCase().includes(q) ||
          i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    setIdeas(result);
  };

  useEffect(() => {
    loadAllIdeas();
  }, [selectedCategory, searchQuery]);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOpenBook = async (bookId: string) => {
    const book = await db.books.get(bookId);
    if (book) {
      onSelectBook(book);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-200 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Deepstash Discovery Feed</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Replace Doomscrolling with Micro-Ideas
        </h2>
        <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
          Bite-sized mental models, quotes, and actionable insights distilled from classic non-fiction books. Tap any card to flip for details.
        </p>
      </div>

      {/* Filter and Search Controls */}
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
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mental models..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>

      </div>

      {/* Cards Grid */}
      {ideas.length === 0 ? (
        <div className="py-16 text-center text-slate-400">
          <p>No idea cards found matching your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => {
            const isFlipped = flippedCards[idea.id];

            return (
              <div key={idea.id} className="h-80 perspective-1000">
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-2xl shadow-xs hover:shadow-md border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between backface-hidden rounded-2xl">
                    <div>
                      {/* Top Meta & Stash Button */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                          {idea.type}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenStashModal(idea);
                          }}
                          className={`p-1.5 rounded-lg border transition ${
                            idea.isStashed
                              ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 text-amber-600'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-500'
                          }`}
                          title={idea.isStashed ? 'Stashed in Board' : 'Stash Idea'}
                        >
                          {idea.isStashed ? (
                            <Check className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug mb-2">
                        {idea.headline}
                      </h3>

                      {idea.quote ? (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-l-3 border-blue-500 mb-2">
                          <Quote className="w-3 h-3 text-blue-500 mb-1" />
                          <p className="text-xs italic text-slate-700 dark:text-slate-300 line-clamp-3">
                            "{idea.quote}"
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed">
                          {idea.body}
                        </p>
                      )}
                    </div>

                    {/* Bottom: Book Link & Flip button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenBook(idea.bookId)}
                        className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition truncate max-w-[65%]"
                      >
                        <BookOpen className="w-3 h-3 shrink-0" />
                        <span className="truncate">{idea.bookTitle}</span>
                      </button>

                      <button
                        onClick={() => toggleFlip(idea.id)}
                        className="flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition"
                      >
                        <span>Details</span>
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between rotate-y-180 backface-hidden rounded-2xl bg-slate-50 dark:bg-slate-900/95">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Action Heuristic & Source
                        </span>
                        <button
                          onClick={() => toggleFlip(idea.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        {idea.body}
                      </p>

                      {idea.actionItem && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                            Apply this:
                          </span>
                          <p className="text-xs font-medium text-emerald-950 dark:text-emerald-200 mt-0.5">
                            {idea.actionItem}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onOpenStashModal(idea)}
                        className="flex items-center space-x-1 text-xs font-semibold text-amber-600 dark:text-amber-400"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{idea.isStashed ? 'In Stash' : 'Stash Card'}</span>
                      </button>

                      <button
                        onClick={() => toggleFlip(idea.id)}
                        className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                      >
                        Flip Front
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

