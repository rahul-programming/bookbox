import React, { useState, useEffect } from 'react';
import { Book, IdeaCard } from '../../types';
import { db } from '../../db';
import { Bookmark, RotateCw, Quote, ArrowRight, Check, Volume2, Search, Filter } from 'lucide-react';

interface IdeaCardsViewProps {
  book: Book;
  onOpenStashModal: (idea: IdeaCard) => void;
  onStartAudio: (headline: string, text: string) => void;
}

export const IdeaCardsView: React.FC<IdeaCardsViewProps> = ({ book, onOpenStashModal, onStartAudio }) => {
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
    let text = `${idea.headline}. ${idea.body}`;
    if (idea.quote) text += ` Quote: ${idea.quote}`;
    if (idea.actionItem) text += ` Action step: ${idea.actionItem}`;
    onStartAudio(`${idea.type}: ${idea.headline}`, text);
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
    <div className="max-w-5xl mx-auto py-6 sm:py-8 space-y-6">
      
      {/* View Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200/80 dark:border-purple-900/60 flex flex-wrap items-center justify-between gap-3">
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
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search idea cards..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Grid of Idea Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => {
          const isFlipped = flippedCards[idea.id];

          return (
            <div
              key={idea.id}
              className="h-80 perspective-1000"
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800/90 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of Card */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between backface-hidden rounded-2xl">
                  <div>
                    {/* Top tags, listen, and stash button */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        {idea.type}
                      </span>

                      <div className="flex items-center space-x-1">
                        {/* Listen Button */}
                        <button
                          onClick={(e) => handleListenCard(idea, e)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-600 transition"
                          title="Listen to this card"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Stash Button */}
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

                    <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug mb-3">
                      {idea.headline}
                    </h4>

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

                  {/* Card Bottom: Flip trigger */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] text-slate-500 dark:text-slate-400">
                          #{t}
                        </span>
                      ))}
                    </div>

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
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        Deep Dive Takeaway
                      </span>
                      
                      <button
                        onClick={(e) => handleListenCard(idea, e)}
                        className="p-1 rounded text-slate-400 hover:text-blue-500"
                        title="Listen to takeaway"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {idea.body}
                    </p>

                    {idea.actionItem && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200">
                        <strong className="block mb-1 font-semibold text-emerald-800 dark:text-emerald-300">
                          Action Step:
                        </strong>
                        {idea.actionItem}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                      {book.title}
                    </span>

                    <button
                      onClick={() => toggleFlip(idea.id)}
                      className="flex items-center space-x-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      <span>Back</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
