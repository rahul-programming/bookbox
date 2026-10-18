import React, { useState } from 'react';
import { Book, MindMapNode } from '../../types';
import { Network, Info, Layers } from 'lucide-react';

interface StoryShotsViewProps {
  book: Book;
}

export const StoryShotsView: React.FC<StoryShotsViewProps> = ({ book }) => {
  const [selectedNode, setSelectedNode] = useState<MindMapNode>(book.mindMap);

  const renderTree = (node: MindMapNode, level: number = 0) => {
    const isSelected = selectedNode.id === node.id;

    return (
      <div key={node.id} className="relative pl-6 my-2">
        {/* Connection line */}
        {level > 0 && (
          <div className="absolute left-0 top-3.5 w-5 h-px bg-slate-300 dark:bg-slate-700" />
        )}

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedNode(node)}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 border shadow-xs ${
              isSelected
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            <span>{node.label}</span>
            {node.children && node.children.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-blue-800 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              }`}>
                {node.children.length}
              </span>
            )}
          </button>
        </div>

        {/* Recursive Children */}
        {node.children && node.children.length > 0 && (
          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-2 mt-1">
            {node.children.map(child => renderTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 space-y-6">
      
      {/* Intro Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-emerald-950 dark:text-emerald-200 flex items-center space-x-2">
            <Network className="w-4 h-4 text-emerald-600" />
            <span>StoryShots Concept Mind Map · {book.title}</span>
          </h3>
          <p className="text-xs text-emerald-800 dark:text-emerald-300">
            Interactive structural diagram mapping out the book’s hierarchy. Tap any node to inspect its details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mind Map Tree View */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            <Layers className="w-4 h-4 text-blue-500" />
            <span>Hierarchical Concept Map</span>
          </div>

          <div className="min-w-fit">
            {renderTree(book.mindMap, 0)}
          </div>
        </div>

        {/* Selected Node Inspector Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Info className="w-4 h-4" />
              <span>Node Inspector</span>
            </div>

            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {selectedNode.label}
            </h4>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-serif">
              {selectedNode.description || 'No additional description provided for this concept node.'}
            </p>

            {selectedNode.children && selectedNode.children.length > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-slate-400 block mb-2">
                  Sub-Branches ({selectedNode.children.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.children.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedNode(c)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
