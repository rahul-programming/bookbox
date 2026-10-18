import React, { useState } from 'react';
import { exportDatabaseBackup, importDatabaseBackup, db } from '../db';
import { Book, Category } from '../types';
import { Download, Upload, Plus, FileText, Check, AlertCircle, X } from 'lucide-react';

interface ImportExportModalProps {
  onClose: () => void;
  onDataChanged: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({ onClose, onDataChanged }) => {
  const [activeTab, setActiveTab] = useState<'backup' | 'custom-book'>('backup');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Custom Book Form State
  const [customTitle, setCustomTitle] = useState('');
  const [customAuthor, setCustomAuthor] = useState('');
  const [customCategory, setCustomCategory] = useState<Category>('Productivity');
  const [customElevator, setCustomElevator] = useState('');
  const [customBlinksText, setCustomBlinksText] = useState('');
  const [customError, setCustomError] = useState<string | null>(null);

  const handleExport = async () => {
    const jsonStr = await exportDatabaseBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookbox_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const content = ev.target?.result as string;
      const success = await importDatabaseBackup(content);
      if (success) {
        setImportStatus('Backup restored successfully!');
        onDataChanged();
      } else {
        setImportStatus('Failed to parse backup JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleCreateCustomBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customAuthor.trim() || !customBlinksText.trim()) {
      setCustomError('Please provide a title, author, and content for blinks.');
      return;
    }

    const slug = customTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const blinkParagraphs = customBlinksText.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    const blinks = blinkParagraphs.map((para, i) => {
      const lines = para.split('\n');
      const headline = lines[0].replace(/^#+\s*/, '').trim();
      const content = lines.slice(1).join('\n').trim() || headline;

      return {
        id: `${slug}-b${i + 1}`,
        order: i + 1,
        headline: headline || `Key Insight ${i + 1}`,
        content: content,
        keyTakeaway: headline,
        audioSnippetText: content
      };
    });

    const newBook: Book = {
      id: slug,
      title: customTitle.trim(),
      author: customAuthor.trim(),
      category: customCategory,
      coverColor: 'from-blue-600 to-indigo-800',
      coverEmoji: '📖',
      readingTimeMinutes: Math.max(5, Math.ceil(blinks.length * 2.5)),
      publishedYear: new Date().getFullYear(),
      tags: ['Custom', customCategory],
      isCustom: true,
      onePageSummary: {
        elevatorPitch: customElevator.trim() || `Comprehensive executive summary of ${customTitle}.`,
        coreThesis: customElevator.trim() || `Core takeaways and action principles from ${customTitle}.`,
        keyPillars: blinks.slice(0, 3).map(b => b.headline),
        strengths: ['Directly imported by user', 'Tailored takeaways'],
        blindSpotsAndCounterarguments: ['User generated or imported text']
      },
      blinks: blinks,
      mindMap: {
        id: `${slug}-map`,
        label: customTitle,
        children: blinks.map(b => ({
          id: b.id,
          label: b.headline,
          description: b.content.slice(0, 100) + '...'
        }))
      },
      reflectionExercises: [
        {
          id: `${slug}-ex-1`,
          chapterOrder: 1,
          title: 'Actionable Takeaway',
          prompt: `What is the single most valuable lesson from ${customTitle} that you can apply immediately?`
        }
      ]
    };

    await db.books.put(newBook);
    onDataChanged();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('backup')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                activeTab === 'backup'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Data Backup & Restore
            </button>
            <button
              onClick={() => setActiveTab('custom-book')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                activeTab === 'custom-book'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Add Custom Book
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab 1: Backup & Restore */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
              <strong>100% Client-Side Privacy: </strong> BookBox does not store anything on an external server. All books, reading streaks, reflection responses, and stashed boards live directly in your browser's IndexedDB. Export a backup to save or transfer to another device.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Export Box */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Export All Data
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Download a single JSON file containing your entire local library, reading progress, and stashed boards.
                  </p>
                </div>

                <button
                  onClick={handleExport}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-xs cursor-pointer"
                >
                  Download .JSON Backup
                </button>
              </div>

              {/* Import Box */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Restore from Backup
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Upload a previously exported BookBox JSON file to restore your learning profile.
                  </p>
                </div>

                <label className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs text-center transition shadow-xs cursor-pointer block">
                  Select Backup File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

            </div>

            {importStatus && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>{importStatus}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Custom Book Importer */}
        {activeTab === 'custom-book' && (
          <form onSubmit={handleCreateCustomBook} className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste in any book summary or article. Separate chapters/blinks with a double line break.
            </p>

            {customError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{customError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Book Title *
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Sapiens"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  value={customAuthor}
                  onChange={(e) => setCustomAuthor(e.target.value)}
                  placeholder="e.g. Yuval Noah Harari"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Category
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as Category)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Productivity">Productivity</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Finance">Finance</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Strategy">Strategy</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  1-Sentence Pitch
                </label>
                <input
                  type="text"
                  value={customElevator}
                  onChange={(e) => setCustomElevator(e.target.value)}
                  placeholder="What is this book about in one sentence?"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Summary Chapters (Separate chapters with double enter) *
              </label>
              <textarea
                value={customBlinksText}
                onChange={(e) => setCustomBlinksText(e.target.value)}
                placeholder="Chapter 1: The First Principle&#10;Everything begins with clarity and focus...&#10;&#10;Chapter 2: Compounding Momentum&#10;Small habits multiply into enormous results..."
                rows={6}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition cursor-pointer"
              >
                Add to Local Library
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

