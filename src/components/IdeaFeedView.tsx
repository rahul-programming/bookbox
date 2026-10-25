import React, { useState, useEffect } from 'react';
import { IdeaCard, Category, Book } from '../types';
import { db } from '../db';
import { Search, Sparkles, RotateCw, Bookmark, Check, BookOpen, Quote, Volume2, X } from 'lucide-react';
import { AudioPlayerBar } from './AudioPlayerBar';

interface IdeaFeedViewProps {
  onSelectBook: (book: Book) => void;
  onOpenStashModal: (idea: IdeaCard) => void;
}

export const IdeaFeedView: React.FC<IdeaFeedViewProps> = ({ onSelectBook, onOpenStashModal }) => {
  const [ideas, setIdeas] = useState<IdeaCard[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeAudioIdea, setActiveAudioIdea] = useState<IdeaCard | null>(null);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    ideas.forEach(i => {
      if (i.category) cats.add(i.category);
    });
    const priorityOrder = ['Productivity', 'Psychology', 'Finance', 'Philosophy', 'Strategy', 'Leadership'];
    const ordered = priorityOrder.filter(c => cats.has(c));
    Array.from(cats).sort().forEach(c => {
      if (!ordered.includes(c)) ordered.push(c);
    });
    return ['All', ...ordered];
  }, [ideas]);

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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 w-full max-w-full overflow-x-hidden">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-200 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Curated Ideas Feed</span>
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
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder="Search mental models..."
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
              <div key={idea.id} className="h-[390px] sm:h-[410px] perspective-1000">
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-2xl shadow-xs hover:shadow-md border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between backface-hidden rounded-2xl overflow-hidden card-face-clip">
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        {idea.type}
                      </span>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAudioIdea(idea);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-600 transition cursor-pointer"
                          title="Listen to this Idea"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenStashModal(idea);
                          }}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
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
                    </div>

                    {/* Scrollable Front Content: Headline + Quote only */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1 my-1 space-y-3">
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug">
                        {idea.headline}
                      </h3>

                      {idea.quote ? (
                        <div className="border-l-3 border-blue-500 pl-3 py-1 break-words">
                          <Quote className="w-3.5 h-3.5 text-blue-500 mb-1" />
                          <p className="text-sm italic text-slate-800 dark:text-slate-200 leading-relaxed break-words">
                            "{idea.quote.replace(/^["']|["']$/g, '')}"
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 break-words">
                          {(idea.body.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                            <p key={idx} className="leading-relaxed break-words">
                              {sentence}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom: Book Link & Flip button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between shrink-0">
                      <button
                        onClick={() => handleOpenBook(idea.bookId)}
                        className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition truncate max-w-[65%] cursor-pointer"
                      >
                        <BookOpen className="w-3 h-3 shrink-0" />
                        <span className="truncate">{idea.bookTitle}</span>
                      </button>

                      <button
                        onClick={() => toggleFlip(idea.id)}
                        className="flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition cursor-pointer"
                      >
                        <span>Details</span>
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between rotate-y-180 backface-hidden rounded-2xl bg-slate-50 dark:bg-slate-900/95 overflow-hidden card-face-clip">
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        Action Heuristic & Source
                      </span>
                      <button
                        onClick={() => toggleFlip(idea.id)}
                        className="p-1.5 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-950 text-purple-600 dark:text-purple-400 transition cursor-pointer"
                        title="Back to Card"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Scrollable Back Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1 my-1 space-y-3">
                      <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 break-words">
                        {(idea.body.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                          <p key={idx} className="leading-relaxed break-words">
                            {sentence}
                          </p>
                        ))}
                      </div>

                      {idea.actionItem && (
                        <div className="border-l-3 border-emerald-500 pl-3 py-1 text-slate-800 dark:text-slate-200 break-words">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
                            Apply this:
                          </span>
                          <div className="space-y-1 text-sm font-medium leading-relaxed break-words">
                            {(idea.actionItem.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                              <p key={idx} className="leading-relaxed break-words">
                                {sentence}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Footer */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                      <button
                        onClick={() => onOpenStashModal(idea)}
                        className="flex items-center space-x-1 text-xs font-semibold text-amber-600 dark:text-amber-400 cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{idea.isStashed ? 'In Stash' : 'Stash Card'}</span>
                      </button>

                      <button
                        onClick={() => toggleFlip(idea.id)}
                        className="flex items-center space-x-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 transition cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Back to Card</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Audio Player when listening to an idea card */}
      {activeAudioIdea && (
        <AudioPlayerBar
          bookTitle={activeAudioIdea.bookTitle}
          activeHeadline={activeAudioIdea.headline}
          activeText={`${activeAudioIdea.headline}. ${activeAudioIdea.body}${activeAudioIdea.quote ? ` Quote: ${activeAudioIdea.quote}` : ''}${activeAudioIdea.actionItem ? ` Action step: ${activeAudioIdea.actionItem}` : ''}`}
          onClose={() => setActiveAudioIdea(null)}
        />
      )}

    </div>
  );
};

