import React, { useState, useEffect } from 'react';
import { Book, IdeaCard } from '../../types';
import { db } from '../../db';
import { Bookmark, RotateCw, Quote, ArrowRight, Check, Volume2, Search, Filter, X } from 'lucide-react';
import { HighlightedSentence } from './HighlightedSentence';

interface IdeaCardsViewProps {
  book: Book;
  onOpenStashModal: (idea: IdeaCard) => void;
  onStartAudio: (headline: string, text: string) => void;
  fontSizeClass?: string;
  highlightRange?: { start: number; length: number };
  activeAudioHeadline?: string;
  isAudioActive?: boolean;
}

export const IdeaCardsView: React.FC<IdeaCardsViewProps> = ({ 
  book, 
  onOpenStashModal, 
  onStartAudio,
  fontSizeClass = 'text-xs sm:text-sm leading-relaxed',
  highlightRange,
  activeAudioHeadline,
  isAudioActive
}) => {
  const [ideas, setIdeas] = useState<IdeaCard[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadIdeas = async () => {
      const bookIdeas = await db.ideas.where('bookId').equals(book.id).toArray();
      if (bookIdeas.length > 0) {
        setIdeas(bookIdeas);
      } else if (book.ideaCards && book.ideaCards.length > 0) {
        setIdeas(book.ideaCards);
      } else {
        // Dynamic fallback from blinks so every book has rich idea cards
        const fallbackCards: IdeaCard[] = book.blinks.map((blink, idx) => ({
          id: `dyn-idea-${book.id}-${idx}`,
          bookId: book.id,
          bookTitle: book.title,
          author: book.author,
          category: book.category,
          type: (idx % 3 === 0 ? 'mental-model' : idx % 3 === 1 ? 'actionable' : 'concept') as any,
          headline: blink.headline,
          body: blink.content.slice(0, 220) + (blink.content.length > 220 ? '...' : ''),
          actionItem: blink.keyTakeaway,
          tags: book.tags.slice(0, 3),
          isStashed: false,
          stashBoardIds: [],
          createdAt: Date.now() - idx * 1000
        }));
        setIdeas(fallbackCards);
      }
    };
    loadIdeas();
  }, [book.id, book.ideaCards, book.blinks]);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleListenCard = (idea: IdeaCard, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onStartAudio(idea.headline, idea.body);
  };

  const handleListenAllCards = () => {
    if (filteredIdeas.length === 0) return;
    const combined = filteredIdeas.map((idea, idx) => {
      let t = `Card ${idx + 1}: ${idea.headline}. ${idea.body}`;
      if (idea.quote) t += ` Quote: ${idea.quote}`;
      if (idea.actionItem) t += ` Action: ${idea.actionItem}`;
      return t;
    }).join('. Next idea. ');

    onStartAudio(`Idea Cards · ${book.title}`, combined);
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesFilter = activeFilter === 'all' || idea.type === activeFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      idea.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (idea.quote && idea.quote.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (ideas.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center text-slate-500">
        <p>No idea cards extracted for this book yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-6 sm:pt-8 pb-16 space-y-4 w-full max-w-full overflow-x-hidden">
      
      {/* View Intro Banner */}
      <div className="scroll-mt-44 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200/80 dark:border-purple-900/60 flex flex-wrap items-center justify-between gap-3 mt-3 sm:mt-4">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-purple-950 dark:text-purple-200">
            Idea Cards · {book.title}
          </h3>
          <p className="text-xs text-purple-800 dark:text-purple-300">
            Atomic mental models, tactical frameworks, and quotes. Tap card to flip or save to stash.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleListenAllCards}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 dark:hover:bg-purple-800/60 text-purple-900 dark:text-purple-100 text-xs font-semibold transition border border-purple-300 dark:border-purple-700 shadow-2xs"
            title="Listen to filtered idea cards"
          >
            <Volume2 className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" />
            <span>Listen Cards</span>
          </button>
          
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-100">
            {filteredIdeas.length} / {ideas.length} Cards
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Cards', count: ideas.length },
            { id: 'mental-model', label: 'Mental Models', count: ideas.filter(i => i.type === 'mental-model').length },
            { id: 'actionable', label: 'Actionable', count: ideas.filter(i => i.type === 'actionable').length },
            { id: 'quote', label: 'Quotes', count: ideas.filter(i => i.type === 'quote').length },
            { id: 'concept', label: 'Concepts', count: ideas.filter(i => i.type === 'concept').length },
          ].filter(tab => tab.count > 0 || tab.id === 'all').map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                activeFilter === tab.id
                  ? 'bg-purple-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder="Search idea cards..."
            className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-purple-500"
          />
          {searchQuery && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setSearchQuery('');
              }}
              onClick={() => setSearchQuery('')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 flex items-center justify-center rounded-full bg-slate-200/90 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-xs transition-all cursor-pointer z-10"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-2.5 h-2.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Idea Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => {
          const isFlipped = flippedCards[idea.id];
          const isCardAudioActive = Boolean(isAudioActive && activeAudioHeadline === idea.headline);

          return (
            <div
              key={idea.id}
              className="h-[390px] sm:h-[410px] perspective-1000"
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-2xl shadow-sm border bg-white dark:bg-slate-800/90 ${
                  isCardAudioActive 
                    ? 'ring-2 ring-blue-500 border-blue-400 dark:border-blue-500 shadow-lg' 
                    : 'border-slate-200/80 dark:border-slate-700/80'
                } ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of Card */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between backface-hidden rounded-2xl overflow-hidden card-face-clip">
                  {/* Top tags, listen, and stash button */}
                  <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      {idea.type}
                    </span>

                    <div className="flex items-center space-x-1">
                      {/* Listen Button */}
                      <button
                        onClick={(e) => handleListenCard(idea, e)}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          isCardAudioActive
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-600'
                        }`}
                        title="Listen to this card"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isCardAudioActive ? 'text-white animate-pulse' : ''}`} />
                      </button>

                      {/* Stash Button */}
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
                        title={idea.isStashed ? 'Saved in Collection' : 'Save Idea'}
                      >
                        {idea.isStashed ? (
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Front Content */}
                  <div className="flex-1 min-h-0 overflow-y-auto pr-1 my-1 space-y-2.5 break-words">
                    <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug break-words">
                      {idea.headline}
                    </h4>

                    {/* Always show the clear plain-English Takeaway on the front */}
                    <div className={`text-slate-700 dark:text-slate-300 space-y-1.5 break-words ${fontSizeClass}`}>
                      {(idea.body.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                        <p key={idx} className="leading-relaxed break-words">
                          {sentence}
                        </p>
                      ))}
                    </div>

                    {idea.quote && (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border-l-2 border-blue-500 break-words mt-1">
                        <Quote className="w-3 h-3 text-blue-500 mb-0.5 inline-block mr-1.5 align-middle" />
                        <span className="text-xs italic text-slate-600 dark:text-slate-400 break-words">
                          "{idea.quote}"
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Flip trigger */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between shrink-0">
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] text-slate-500 dark:text-slate-400">
                          #{t}
                        </span>
                      ))}
                    </div>

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
                  {/* Top Meta Bar with Audio & Quick Flip */}
                  <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Deep Dive Takeaway
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => handleListenCard(idea, e)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition cursor-pointer"
                        title="Listen to takeaway"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleFlip(idea.id)}
                        className="p-1.5 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-950 text-purple-600 dark:text-purple-400 transition cursor-pointer"
                        title="Back to Card"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Back Content - Prevents Any Spillover */}
                  <div className="flex-1 min-h-0 overflow-y-auto pr-1 my-1 space-y-3 break-words">
                    <div className={`text-slate-700 dark:text-slate-300 space-y-1.5 break-words ${fontSizeClass}`}>
                      {(idea.body.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                        <p key={idx} className="leading-relaxed break-words">
                          {sentence}
                        </p>
                      ))}
                    </div>

                    {idea.actionItem && (
                      <div className={`p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200 break-words ${fontSizeClass}`}>
                        <strong className="block mb-1 font-semibold text-emerald-800 dark:text-emerald-300 break-words">
                          Action Step:
                        </strong>
                        <div className="space-y-1 break-words">
                          {(idea.actionItem.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                            <p key={idx} className="leading-relaxed break-words">
                              {sentence}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pinned Bottom Footer */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                    <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                      {book.title}
                    </span>

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

    </div>
  );
};
