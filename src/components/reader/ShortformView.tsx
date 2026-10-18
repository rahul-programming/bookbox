import React, { useState, useEffect } from 'react';
import { Book, ReflectionAnswer } from '../../types';
import { db } from '../../db';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  PenTool, 
  ListOrdered,
  ChevronDown,
  ChevronRight,
  Save
} from 'lucide-react';

interface ShortformViewProps {
  book: Book;
  fontSizeClass: string;
}

export const ShortformView: React.FC<ShortformViewProps> = ({ book, fontSizeClass }) => {
  const [activeSection, setActiveSection] = useState<'one-page' | 'chapters' | 'exercises'>('one-page');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'ch-0': true
  });
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load user's saved reflection answers from Dexie
    const loadAnswers = async () => {
      const records = await db.exercises.where('bookId').equals(book.id).toArray();
      const map: Record<string, string> = {};
      records.forEach(r => {
        map[r.exerciseId] = r.userResponse;
      });
      setExerciseAnswers(map);
    };
    loadAnswers();
  }, [book.id]);

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAnswerChange = async (exerciseId: string, prompt: string, text: string) => {
    setExerciseAnswers(prev => ({
      ...prev,
      [exerciseId]: text
    }));

    const answerRecord: ReflectionAnswer = {
      id: `${book.id}_${exerciseId}`,
      exerciseId,
      bookId: book.id,
      prompt,
      userResponse: text,
      updatedAt: Date.now()
    };

    await db.exercises.put(answerRecord);

    setSavedStatus(prev => ({ ...prev, [exerciseId]: true }));
    setTimeout(() => {
      setSavedStatus(prev => ({ ...prev, [exerciseId]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* Sidebar Table of Contents */}
      <aside className="lg:col-span-1 space-y-4">
        <div className="sticky top-24 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            <ListOrdered className="w-4 h-4 text-blue-500" />
            <span>Guide Outline</span>
          </div>

          <nav className="space-y-1 text-sm font-medium">
            <button
              onClick={() => setActiveSection('one-page')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center space-x-2 transition ${
                activeSection === 'one-page'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1-Page Summary</span>
            </button>

            <button
              onClick={() => setActiveSection('chapters')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center space-x-2 transition ${
                activeSection === 'chapters'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Detailed Chapters</span>
            </button>

            <button
              onClick={() => setActiveSection('exercises')}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center space-x-2 transition ${
                activeSection === 'exercises'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Exercises ({book.reflectionExercises.length})</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:col-span-3 space-y-8">
        
        {/* Section 1: The 1-Page Summary (Shortform hallmark) */}
        {activeSection === 'one-page' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Executive Overview
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1 mb-4">
                The 1-Page Master Summary of {book.title}
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                {book.onePageSummary.elevatorPitch}
              </p>
            </div>

            {/* Core Thesis */}
            <div className="p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-2">
                Central Thesis
              </h3>
              <p className="text-base sm:text-lg font-semibold text-blue-950 dark:text-blue-100 leading-relaxed">
                "{book.onePageSummary.coreThesis}"
              </p>
            </div>

            {/* Main Pillars */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
                Key Conceptual Pillars
              </h3>
              <ul className="space-y-3">
                {book.onePageSummary.keyPillars.map((pillar, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths & Counterarguments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60">
                <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm mb-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Key Strengths</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                  {book.onePageSummary.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Counterarguments & Blind Spots (Shortform analytical hallmark) */}
              <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
                <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-400 font-bold text-sm mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Blind Spots & Counterpoints</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                  {book.onePageSummary.blindSpotsAndCounterarguments.map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* Section 2: Detailed Chapter Breakdowns */}
        {activeSection === 'chapters' && (
          <div className="space-y-4">
            {book.blinks.map((blink, idx) => {
              const chKey = `ch-${idx}`;
              const isExpanded = expandedChapters[chKey];

              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleChapter(chKey)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                        {blink.headline}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-6 pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
                      <div className={`text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed font-serif ${fontSizeClass}`}>
                        {blink.content.split('\n\n').map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {/* Editorial Context Callout */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border-l-4 border-blue-500 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Shortform Synthesis: </strong>
                        {blink.keyTakeaway}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Section 3: Interactive Reflection Worksheets (Shortform active learning) */}
        {activeSection === 'exercises' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60">
              <h3 className="text-base font-bold text-indigo-950 dark:text-indigo-200 mb-1">
                Interactive Application Exercises
              </h3>
              <p className="text-xs text-indigo-800 dark:text-indigo-300">
                To beat the forgetting curve, answer these guided reflection prompts. Responses are automatically saved to your local browser database.
              </p>
            </div>

            {book.reflectionExercises.map((exercise, idx) => {
              const currentVal = exerciseAnswers[exercise.id] || '';
              const isSaved = savedStatus[exercise.id];

              return (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Exercise {idx + 1}: {exercise.title}
                    </span>
                    {isSaved && (
                      <span className="flex items-center space-x-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in">
                        <Save className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    {exercise.prompt}
                  </p>

                  <textarea
                    value={currentVal}
                    onChange={(e) => handleAnswerChange(exercise.id, exercise.prompt, e.target.value)}
                    placeholder="Write your reflections here... (auto-saved to local IndexedDB)"
                    rows={4}
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y font-sans"
                  />
                </div>
              );
            })}
          </div>
        )}

      </main>

    </div>
  );
};
