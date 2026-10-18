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
  Save,
  Volume2,
  Sparkles
} from 'lucide-react';
import { ChapterDiagramViewer } from './ChapterDiagramViewer';

interface DeepDiveViewProps {
  book: Book;
  fontSizeClass: string;
  onStartAudio: (headline: string, text: string) => void;
}

export const DeepDiveView: React.FC<DeepDiveViewProps> = ({ book, fontSizeClass, onStartAudio }) => {
  const [activeSection, setActiveSection] = useState<'one-page' | 'chapters' | 'stories' | 'exercises'>('one-page');
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

  const handleListenOnePage = () => {
    const s = book.onePageSummary;
    const text = `The 1-Page Master Summary of ${book.title} by ${book.author}. ${s.elevatorPitch}. Central Thesis: ${s.coreThesis}. Key conceptual pillars: ${s.keyPillars.join('. ')}. Key strengths: ${s.strengths.join('. ')}. Blind spots and counterarguments: ${s.blindSpotsAndCounterarguments.join('. ')}`;
    onStartAudio(`1-Page Master Summary · ${book.title}`, text);
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

          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection('one-page')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                activeSection === 'one-page'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>1-Page Summary</span>
            </button>

            <button
              onClick={() => setActiveSection('chapters')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                activeSection === 'chapters'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Chapter Analyses ({book.blinks.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('stories')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                activeSection === 'stories'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Stories & Anecdotes ({book.stories?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveSection('exercises')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                activeSection === 'exercises'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <PenTool className="w-4 h-4 shrink-0" />
              <span>Interactive Exercises ({book.reflectionExercises.length})</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:col-span-3 space-y-8">
        
        {/* Section 1: The 1-Page Summary */}
        {activeSection === 'one-page' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Executive Overview
                </span>
                
                <button
                  onClick={handleListenOnePage}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold transition border border-blue-200 dark:border-blue-900 shadow-2xs"
                  title="Listen to 1-Page Summary with natural female voice"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                  <span>Listen 1-Page Summary</span>
                </button>
              </div>

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

              {/* Counterarguments & Blind Spots */}
              <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
                <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-400 font-bold text-sm mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Blind Spots & Counterarguments</span>
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
                  <div className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                    <button
                      onClick={() => toggleChapter(chKey)}
                      className="flex-1 text-left flex items-center space-x-3 mr-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                        {blink.headline}
                      </h3>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartAudio(blink.headline, blink.content);
                        }}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 hover:text-blue-600 dark:text-slate-200 text-xs font-semibold transition"
                        title="Listen to this chapter"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                        <span className="hidden sm:inline">Listen</span>
                      </button>

                      <button
                        onClick={() => toggleChapter(chKey)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
                      <div className={`text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed font-serif ${fontSizeClass}`}>
                        {blink.content.split('\n\n').map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {/* Chapter Visual Diagram Summary */}
                      {blink.diagram && (
                        <ChapterDiagramViewer diagram={blink.diagram} />
                      )}

                      {/* Editorial Context Callout */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border-l-4 border-blue-500 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-slate-100">Editorial Synthesis: </strong>
                        {blink.keyTakeaway}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Section 3: Iconic Stories & Historical Anecdotes */}
        {activeSection === 'stories' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
                  Iconic Stories & Case Studies · {book.title}
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                  Real-world historical anecdotes, clinical experiments, and human stories that prove the principles.
                </p>
              </div>
            </div>

            {(!book.stories || book.stories.length === 0) ? (
              <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <p>No standalone story anthology extracted yet. Anecdotes are woven directly into the Chapter Analyses.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {book.stories.map((story, idx) => (
                  <div key={story.id} className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                          Story {idx + 1}
                        </span>
                        {story.historicalPeriodOrSetting && (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
                            {story.historicalPeriodOrSetting}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-medium">
                          · {story.charactersOrSubject}
                        </span>
                      </div>

                      <button
                        onClick={() => onStartAudio(story.title, `${story.title}. Setting: ${story.historicalPeriodOrSetting || ''}. Narrative: ${story.narrative}. Core lesson: ${story.coreLesson}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                        title="Listen to this story"
                      >
                        <Volume2 className="w-4 h-4 text-amber-500" />
                      </button>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {story.title}
                    </h4>

                    <div className={`text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed font-serif ${fontSizeClass}`}>
                      {story.narrative.split('\n\n').map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                      <strong className="text-amber-950 dark:text-amber-100">Core Behavioral Lesson: </strong>
                      {story.coreLesson}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 4: Interactive Reflection Exercises */}
        {activeSection === 'exercises' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
                  Interactive Action Worksheets
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                  Type your reflection responses. Work is automatically saved locally to your device.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {book.reflectionExercises.map((ex, idx) => {
                const answer = exerciseAnswers[ex.id] || '';
                const isSaved = savedStatus[ex.id];

                return (
                  <div 
                    key={ex.id}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                          Exercise {idx + 1}
                        </span>
                        <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                          {ex.title}
                        </h4>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onStartAudio(ex.title, `Exercise: ${ex.title}. ${ex.prompt}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                          title="Listen to exercise prompt"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {isSaved && (
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 animate-fade-in">
                            <Save className="w-3.5 h-3.5" />
                            <span>Saved</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                      {ex.prompt}
                    </p>

                    <div className="relative">
                      <textarea
                        value={answer}
                        onChange={(e) => handleAnswerChange(ex.id, ex.prompt, e.target.value)}
                        placeholder="Write your personal reflections and action steps here..."
                        rows={4}
                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 outline-none transition resize-y font-sans"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
