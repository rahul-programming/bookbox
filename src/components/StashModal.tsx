import React, { useState, useEffect } from 'react';
import { IdeaCard, StashBoard } from '../types';
import { db } from '../db';
import { X, Plus, Bookmark, Check } from 'lucide-react';

interface StashModalProps {
  idea: IdeaCard | null;
  onClose: () => void;
  onSaved: () => void;
}

export const StashModal: React.FC<StashModalProps> = ({ idea, onClose, onSaved }) => {
  const [boards, setBoards] = useState<StashBoard[]>([]);
  const [selectedBoardIds, setSelectedBoardIds] = useState<string[]>([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!idea) return;
    const loadBoards = async () => {
      const allBoards = await db.stashes.toArray();
      setBoards(allBoards);
      setSelectedBoardIds(idea.stashBoardIds || []);
    };
    loadBoards();
  }, [idea]);

  if (!idea) return null;

  const toggleBoard = (boardId: string) => {
    setSelectedBoardIds(prev =>
      prev.includes(boardId)
        ? prev.filter(id => id !== boardId)
        : [...prev, boardId]
    );
  };

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;

    const newBoard: StashBoard = {
      id: `board-${Date.now()}`,
      name: newBoardName.trim(),
      description: 'Custom learning collection',
      icon: '💡',
      color: 'bg-indigo-500',
      createdAt: Date.now()
    };

    await db.stashes.add(newBoard);
    setBoards(prev => [...prev, newBoard]);
    setSelectedBoardIds(prev => [...prev, newBoard.id]);
    setNewBoardName('');
    setIsCreating(false);
  };

  const handleSave = async () => {
    const isNowStashed = selectedBoardIds.length > 0;
    
    await db.ideas.update(idea.id, {
      isStashed: isNowStashed,
      stashBoardIds: selectedBoardIds
    });

    const profile = await db.profile.get('active_profile');
    if (profile) {
      const allStashed = await db.ideas.where('isStashed').equals(1).count();
      profile.totalIdeasStashed = allStashed;
      await db.profile.put(profile);
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-2xl space-y-5 animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <span>Stash Idea to Board</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Idea Preview Snippet */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mb-1">
            {idea.headline}
          </p>
          <p className="text-slate-500 dark:text-slate-400 line-clamp-2">
            {idea.body}
          </p>
        </div>

        {/* Existing Boards List */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Select Collections
          </label>

          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {boards.map((b) => {
              const isSelected = selectedBoardIds.includes(b.id);
              return (
                <div
                  key={b.id}
                  onClick={() => toggleBoard(b.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base">{b.icon}</span>
                    <span className="text-sm font-semibold">{b.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Create New Board Inline Form */}
        {isCreating ? (
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Board name (e.g., Mental Models)"
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleCreateBoard}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition"
            >
              Add
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-3 py-2 rounded-xl text-slate-400 hover:text-slate-600 text-xs"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 pt-1"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Board</span>
          </button>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition"
          >
            Save Stash
          </button>
        </div>

      </div>
    </div>
  );
};

