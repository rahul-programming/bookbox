import React, { useState, useEffect } from 'react';
import { Book, IdeaCard } from '../../types';
import { db } from '../../db';
import { Bookmark, RotateCw, Quote, ArrowRight, Check } from 'lucide-react';

interface DeepstashViewProps {
  book: Book;
  onOpenStashModal: (idea: IdeaCard) => void;
}

export const DeepstashView: React.FC<DeepstashViewProps> = ({ book, onOpenStashModal }) => {
  const [ideas, setIdeas] = useState<IdeaCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadIdeas = async () => {
      const bookIdeas = await db.ideas.where('bookId').equals(book.id).toArray();
      setIdeas(bookIdeas);
    };
    loadIdeas();
  }, [book.id]);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200/80 dark:border-purple-900/60 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-purple-950 dark:text-purple-200">
            Deepstash Idea Cards · {book.title}
          </h3>
          <p className="text-xs text-purple-800 dark:text-purple-300">
            Atomic mental models and insights. Tap to flip cards or stash them to your personal boards.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-100">
          {ideas.length} Cards
        </span>
      </div>

      {/* Grid of Idea Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => {
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
                    {/* Top tags and stash button */}
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
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Actionable & Context
                      </span>
                      <button
                        onClick={() => toggleFlip(idea.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        title="Flip back"
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
                          Action Heuristic:
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
                      <span>{idea.isStashed ? 'Change Board' : 'Stash to Board'}</span>
                    </button>

                    <button
                      onClick={() => toggleFlip(idea.id)}
                      className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                    >
                      Flip Back
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

