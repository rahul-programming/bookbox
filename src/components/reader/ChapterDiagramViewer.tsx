import React from 'react';
import { ChapterDiagram, DiagramNode } from '../../types';
import { 
  ArrowRight, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Zap, 
  Compass, 
  Layers, 
  GitFork,
  Activity
} from 'lucide-react';

interface ChapterDiagramViewerProps {
  diagram?: ChapterDiagram;
}

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; ring: string }> = {
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-900 dark:text-emerald-100',
    badge: 'bg-emerald-500 text-white',
    ring: 'ring-emerald-400/30'
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-900 dark:text-blue-100',
    badge: 'bg-blue-600 text-white',
    ring: 'ring-blue-400/30'
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-900 dark:text-indigo-100',
    badge: 'bg-indigo-600 text-white',
    ring: 'ring-indigo-400/30'
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-900 dark:text-amber-100',
    badge: 'bg-amber-500 text-white',
    ring: 'ring-amber-400/30'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-900 dark:text-purple-100',
    badge: 'bg-purple-600 text-white',
    ring: 'ring-purple-400/30'
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-900 dark:text-rose-100',
    badge: 'bg-rose-500 text-white',
    ring: 'ring-rose-400/30'
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-900 dark:text-cyan-100',
    badge: 'bg-cyan-600 text-white',
    ring: 'ring-cyan-400/30'
  }
};

export const ChapterDiagramViewer: React.FC<ChapterDiagramViewerProps> = ({ diagram }) => {
  if (!diagram) return null;

  const renderCycleDiagram = () => {
    const nodes = diagram.nodes || [];
    return (
      <div className="space-y-4">
        {/* Responsive Grid / Sequence of Cycle Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nodes.map((node, idx) => {
            const color = COLOR_MAP[node.color || 'blue'] || COLOR_MAP.blue;
            return (
              <div 
                key={node.id} 
                className={`relative p-4 rounded-xl border ${color.bg} ${color.border} shadow-xs flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${color.badge}`}>
                      {idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Step {idx + 1}
                    </span>
                  </div>
                  <h5 className={`font-bold text-sm ${color.text}`}>
                    {node.label}
                  </h5>
                  {node.sublabel && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {node.sublabel}
                    </p>
                  )}
                </div>

                {/* Arrow indicator to next step (for desktop) */}
                {idx < nodes.length - 1 ? (
                  <div className="hidden lg:flex justify-end pt-2 text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center space-x-1 justify-end pt-2 text-blue-500 font-semibold text-[10px]">
                    <RotateCw className="w-3 h-3" />
                    <span>Loops back</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback loop indicator bar */}
        <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 flex items-center justify-center space-x-2">
          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span><strong>Continuous Feedback Loop:</strong> Each repetition reinforces the neural pathway and reduces friction.</span>
        </div>
      </div>
    );
  };

  const renderFlowDiagram = () => {
    const nodes = diagram.nodes || [];
    return (
      <div className="flex flex-col md:flex-row items-stretch gap-2.5">
        {nodes.map((node, idx) => {
          const color = COLOR_MAP[node.color || 'indigo'] || COLOR_MAP.indigo;
          const isLast = idx === nodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              <div className={`flex-1 p-4 rounded-xl border ${color.bg} ${color.border} shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${color.badge}`}>
                      {idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Phase</span>
                  </div>
                  <h5 className={`font-bold text-sm ${color.text}`}>
                    {node.label}
                  </h5>
                  {node.sublabel && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {node.sublabel}
                    </p>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className="flex items-center justify-center text-slate-400 py-1 md:py-0">
                  <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0 text-slate-400" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderMatrixDiagram = () => {
    const quads = diagram.quadrants || [];
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quads.map((q, idx) => {
          const color = COLOR_MAP[q.color || 'blue'] || COLOR_MAP.blue;
          return (
            <div key={idx} className={`p-4 rounded-xl border ${color.bg} ${color.border} shadow-xs`}>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${color.badge}`} />
                <h5 className={`font-bold text-sm ${color.text}`}>
                  {q.title}
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {q.description}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderComparisonDiagram = () => {
    const comp = diagram.comparison;
    if (!comp) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Side A */}
        <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-sm text-red-900 dark:text-red-200 flex items-center space-x-1.5">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>{comp.sideA.title}</span>
            </h5>
            {comp.sideA.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300">
                {comp.sideA.badge}
              </span>
            )}
          </div>
          {comp.sideA.subtitle && (
            <p className="text-xs text-red-800/80 dark:text-red-300/80 italic">
              {comp.sideA.subtitle}
            </p>
          )}
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {comp.sideA.items.map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-red-500 font-bold mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Side B */}
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{comp.sideB.title}</span>
            </h5>
            {comp.sideB.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                {comp.sideB.badge}
              </span>
            )}
          </div>
          {comp.sideB.subtitle && (
            <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 italic">
              {comp.sideB.subtitle}
            </p>
          )}
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {comp.sideB.items.map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderTimelineDiagram = () => {
    const nodes = diagram.nodes || [];
    return (
      <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-emerald-500">
        {nodes.map((node, idx) => {
          const color = COLOR_MAP[node.color || 'blue'] || COLOR_MAP.blue;
          return (
            <div key={node.id} className="relative group">
              <span className={`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${color.badge} shadow-xs`} />
              <div className={`p-3 rounded-xl border ${color.bg} ${color.border}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Phase {idx + 1}
                  </span>
                  <h5 className={`font-bold text-xs sm:text-sm ${color.text}`}>
                    {node.label}
                  </h5>
                </div>
                {node.sublabel && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {node.sublabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/90 dark:to-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-xs space-y-4">
      {/* Diagram Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <span>{diagram.title}</span>
            </h4>
            {diagram.caption && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {diagram.caption}
              </p>
            )}
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700">
          Visual Mental Model
        </span>
      </div>

      {/* Diagram Body */}
      <div>
        {diagram.type === 'cycle' && renderCycleDiagram()}
        {diagram.type === 'flow' && renderFlowDiagram()}
        {diagram.type === 'matrix' && renderMatrixDiagram()}
        {diagram.type === 'comparison' && renderComparisonDiagram()}
        {diagram.type === 'timeline' && renderTimelineDiagram()}
      </div>
    </div>
  );
};

