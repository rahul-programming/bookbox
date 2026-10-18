import React, { useState, useMemo } from 'react';
import { Book, ActionItem, ActionCategory } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  Volume2, 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  ListOrdered,
  Zap,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ActionItemsViewProps {
  book: Book;
  completedActionIds: string[];
  onToggleAction: (actionId: string) => void;
  onStartAudio: (headline: string, text: string) => void;
}

const CATEGORY_LABELS: Record<ActionCategory, { label: string; badge: string; icon: string }> = {
  'quick-win': { label: 'Quick Wins (< 5 min)', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800', icon: '⚡' },
  'daily-routine': { label: 'Daily Routines', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800', icon: '🔄' },
  'environment': { label: 'Environment Setup', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800', icon: '🏡' },
  'audit': { label: 'Audits & Scorecards', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800', icon: '📊' },
  'system': { label: 'System Overhauls', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800', icon: '⚙️' }
};

export const ActionItemsView: React.FC<ActionItemsViewProps> = ({
  book,
  completedActionIds,
  onToggleAction,
  onStartAudio
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  // Fallback generation of action items if not explicitly set on book
  const actions: ActionItem[] = useMemo(() => {
    if (book.actionItems && book.actionItems.length > 0) {
      return book.actionItems;
    }

    // Dynamic generation from blinks and exercises
    const derived: ActionItem[] = [];

    book.blinks.forEach((blink, idx) => {
      derived.push({
        id: `${book.id}-action-${idx + 1}`,
        title: `Implement: ${blink.headline}`,
        description: blink.keyTakeaway,
        category: idx % 3 === 0 ? 'quick-win' : idx % 3 === 1 ? 'daily-routine' : 'environment',
        timeEstimateMinutes: idx % 2 === 0 ? 5 : 15,
        stepByStep: [
          `Review the core insight: "${blink.headline}"`,
          `Identify one trigger in your current day where this applies`,
          `Execute a 2-minute trial of this behavior today`
        ],
        sourceChapter: `Chapter ${idx + 1}`
      });
    });

    if (book.reflectionExercises) {
      book.reflectionExercises.forEach((ex, idx) => {
        derived.push({
          id: `${book.id}-exercise-act-${idx + 1}`,
          title: `Action Worksheet: ${ex.title}`,
          description: ex.prompt,
          category: 'audit',
          timeEstimateMinutes: 10,
          stepByStep: [
            'Read the introspective prompt carefully',
            'Write down your current baseline in BookBox or a journal',
            'Commit to one measurable change over the next 7 days'
          ]
        });
      });
    }

    return derived;
  }, [book]);

  const toggleSteps = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = actions.filter(a => completedActionIds.includes(a.id)).length;
  const progressPercent = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0;

  const filteredActions = useMemo(() => {
    if (selectedCategory === 'all') return actions;
    return actions.filter(a => a.category === selectedCategory);
  }, [actions, selectedCategory]);

  const handleCheckboxClick = (id: string) => {
    const isNowCompleted = !completedActionIds.includes(id);
    onToggleAction(id);

    if (isNowCompleted && completedCount + 1 === actions.length) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleListenAction = (item: ActionItem) => {
    const text = `Action Item: ${item.title}. Estimated time: ${item.timeEstimateMinutes} minutes. Description: ${item.description}. Step by step implementation: ${item.stepByStep.join('. ')}.`;
    onStartAudio(item.title, text);
  };

  const handleListenAllActions = () => {
    if (actions.length === 0) return;
    const fullScript = actions.map((a, i) => 
      `Action ${i + 1}: ${a.title}. ${a.description}. Steps: ${a.stepByStep.join(', ')}.`
    ).join(' Next action. ');

    onStartAudio(`Tactical Action Plan · ${book.title}`, fullScript);
  };

  const handleCopyMarkdown = () => {
    const mdLines = [
      `# Tactical Action Plan: ${book.title} by ${book.author}`,
      `Generated from BookBox (100% Local Offline Synthesizer)\n`,
      ...actions.map(a => {
        const isDone = completedActionIds.includes(a.id);
        const check = isDone ? '[x]' : '[ ]';
        const steps = a.stepByStep.map(s => `  - ${s}`).join('\n');
        return `- ${check} **${a.title}** (~${a.timeEstimateMinutes} min)\n  ${a.description}\n${steps}`;
      })
    ];

    navigator.clipboard.writeText(mdLines.join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 space-y-6">
      
      {/* Top Banner & Progress Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 p-6 sm:p-8 text-white shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
              <Zap className="w-4 h-4 text-emerald-300" />
              <span>Tactical Implementation Playbook</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Action Plan · {book.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Knowledge without execution is meaningless. Turn the core mental models and stories of this book into concrete, trackable steps.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleListenAllActions}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 backdrop-blur-md transition cursor-pointer"
              title="Listen to full action plan"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Listen Plan</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
              title="Copy checklist to Notion, Apple Notes, or Todoist"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Markdown!' : 'Export Checklist'}</span>
            </button>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-white/20">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Execution Progress</span>
            </span>
            <span>
              {completedCount} of {actions.length} Completed ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-black/20 overflow-hidden p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-300 transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          All Actions ({actions.length})
        </button>

        {(Object.keys(CATEGORY_LABELS) as ActionCategory[]).map(cat => {
          const info = CATEGORY_LABELS[cat];
          const count = actions.filter(a => a.category === cat).length;
          if (count === 0) return null;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{info.icon}</span>
              <span>{info.label} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {filteredActions.map((item, idx) => {
          const isDone = completedActionIds.includes(item.id);
          const isExpanded = expandedSteps[item.id] ?? false;
          const catInfo = CATEGORY_LABELS[item.category] || CATEGORY_LABELS['quick-win'];

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                isDone 
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-900/60 opacity-80'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="p-5 flex items-start space-x-4">
                {/* Interactive Checkbox */}
                <button
                  onClick={() => handleCheckboxClick(item.id)}
                  className={`mt-0.5 p-1 rounded-lg transition transform active:scale-90 cursor-pointer ${
                    isDone 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-slate-300 dark:text-slate-600 hover:text-emerald-500'
                  }`}
                  title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${catInfo.badge}`}>
                        {catInfo.icon} {catInfo.label}
                      </span>

                      <span className="flex items-center space-x-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>~{item.timeEstimateMinutes} min</span>
                      </span>

                      {item.sourceChapter && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          · {item.sourceChapter}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleListenAction(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                        title="Listen to this action item"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleSteps(item.id)}
                        className="flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <span>Steps ({item.stepByStep.length})</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <h3 className={`text-base font-bold text-slate-900 dark:text-slate-100 ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Linked Story Badge if present */}
                  {item.linkedStory && (
                    <div className="pt-1 flex items-center space-x-1.5 text-xs text-amber-700 dark:text-amber-400 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      <span>Based on: {item.linkedStory}</span>
                    </div>
                  )}

                  {/* Expandable Step-by-Step Checklist */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2 animate-fade-in">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                        <ListOrdered className="w-3.5 h-3.5 text-blue-500" />
                        <span>Implementation Protocol</span>
                      </h4>
                      <ol className="space-y-1.5 pl-1">
                        {item.stepByStep.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

