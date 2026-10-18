import React, { useState, useEffect } from 'react';
import { StashBoard, IdeaCard } from '../types';
import { db } from '../db';
import { 
  FolderKanban, 
  Plus, 
  Layers, 
  Sparkles, 
  RotateCw, 
  ArrowLeft, 
  Trash2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StashBoardsViewProps {
  onOpenStashModal: (idea: IdeaCard) => void;
}

export const StashBoardsView: React.FC<StashBoardsViewProps> = ({ onOpenStashModal }) => {
  const [boards, setBoards] = useState<StashBoard[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<StashBoard | null>(null);
  const [boardIdeas, setBoardIdeas] = useState<IdeaCard[]>([]);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const loadBoards = async () => {
    const all = await db.stashes.toArray();
    setBoards(all);
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const handleSelectBoard = async (board: StashBoard) => {
    setSelectedBoard(board);
    const ideas = await db.ideas
      .filter(i => (i.stashBoardIds || []).includes(board.id))
      .toArray();
    setBoardIdeas(ideas);
    setIsFlashcardMode(false);
  };

  const handleStartFlashcards = () => {
    if (boardIdeas.length === 0) return;
    setIsFlashcardMode(true);
    setFlashcardIndex(0);
    setIsFlipped(false);
  };

  const handleNextFlashcard = () => {
    if (flashcardIndex + 1 < boardIdeas.length) {
      setFlashcardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Completed deck!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setIsFlashcardMode(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Detail View of a specific board */}
      {selectedBoard ? (
        <div className="space-y-6">
          {/* Header & Back */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedBoard(null)}
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Stashes</span>
            </button>

            {boardIdeas.length > 0 && !isFlashcardMode && (
              <button
                onClick={handleStartFlashcards}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Flashcard Review ({boardIdeas.length})</span>
              </button>
            )}
          </div>

          {/* Flashcard Review Mode */}
          {isFlashcardMode ? (
            <div className="max-w-xl mx-auto py-6 space-y-6 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Card {flashcardIndex + 1} of {boardIdeas.length}</span>
                <button
                  onClick={() => setIsFlashcardMode(false)}
                  className="hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Exit Review
                </button>
              </div>

              {/* 3D Review Flashcard */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-96 p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-xl flex flex-col justify-between cursor-pointer transition-all transform hover:scale-[1.01]"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900">
                    {boardIdeas[flashcardIndex].category} · {boardIdeas[flashcardIndex].bookTitle}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-6 leading-snug">
                    {boardIdeas[flashcardIndex].headline}
                  </h3>

                  {isFlipped ? (
                    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 space-y-4 animate-fade-in">
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                        {boardIdeas[flashcardIndex].body}
                      </p>
                      {boardIdeas[flashcardIndex].actionItem && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200">
                          <strong>Action Rule: </strong> {boardIdeas[flashcardIndex].actionItem}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-2">
                      <HelpCircle className="w-8 h-8 text-slate-300 dark:text-slate-600 animate-bounce" />
                      <p className="text-xs font-medium">Tap to reveal explanation & mental model</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
                  <span>{isFlipped ? 'Tap to hide' : 'Tap to flip'}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextFlashcard();
                    }}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition"
                  >
                    {flashcardIndex + 1 === boardIdeas.length ? 'Finish Deck' : 'Next Card'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Grid of Cards inside this board */
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedBoard.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedBoard.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedBoard.description} · {boardIdeas.length} ideas stashed
                  </p>
                </div>
              </div>

              {boardIdeas.length === 0 ? (
                <div className="py-16 text-center text-slate-400 bg-white dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                  <p>No ideas stashed in this board yet.</p>
                  <p className="text-xs mt-1 text-slate-500">
                    Browse the Idea Feed or Book Summaries and click "Stash" to add insights here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boardIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 mb-1">
                          <span>{idea.category}</span>
                          <span>{idea.bookTitle}</span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug">
                          {idea.headline}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-4 mt-2 leading-relaxed">
                          {idea.body}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                        <button
                          onClick={() => onOpenStashModal(idea)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
                        >
                          Manage Board
                        </button>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Saved</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Overview of all Boards */
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-lg">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
              <FolderKanban className="w-4 h-4" />
              <span>Personal Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Your Curated "Second Brain"
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Organize favorite mental models, quotes, and heuristics into personal decks. Review them with spaced repetition flashcards to internalize big ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <div
                key={board.id}
                onClick={() => handleSelectBoard(board)}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-lg hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {board.icon}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {board.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {board.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Open Collection</span>
                  <Layers className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

