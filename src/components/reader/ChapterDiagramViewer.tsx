import React from 'react';
import { ChapterDiagram } from '../../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  GitFork 
} from 'lucide-react';

interface ChapterDiagramViewerProps {
  diagram?: ChapterDiagram;
  fontSizeClass?: string;
}

const COLOR_MAP: Record<string, { text: string; badge: string; accent: string }> = {
  emerald: {
    text: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-600 text-white',
    accent: 'border-emerald-500'
  },
  blue: {
    text: 'text-blue-700 dark:text-blue-300',
    badge: 'bg-blue-600 text-white',
    accent: 'border-blue-500'
  },
  indigo: {
    text: 'text-indigo-700 dark:text-indigo-300',
    badge: 'bg-indigo-600 text-white',
    accent: 'border-indigo-500'
  },
  amber: {
    text: 'text-amber-700 dark:text-amber-300',
    badge: 'bg-amber-500 text-white',
    accent: 'border-amber-500'
  },
  purple: {
    text: 'text-purple-700 dark:text-purple-300',
    badge: 'bg-purple-600 text-white',
    accent: 'border-purple-500'
  },
  rose: {
    text: 'text-rose-700 dark:text-rose-300',
    badge: 'bg-rose-600 text-white',
    accent: 'border-rose-500'
  },
  cyan: {
    text: 'text-cyan-700 dark:text-cyan-300',
    badge: 'bg-cyan-600 text-white',
    accent: 'border-cyan-500'
  }
};

export const ChapterDiagramViewer: React.FC<ChapterDiagramViewerProps> = ({ 
  diagram,
  fontSizeClass = 'text-sm sm:text-base leading-relaxed'
}) => {
  if (!diagram) return null;

  const renderCycleDiagram = () => {
    const nodes = diagram.nodes || [];
    return (
      <div className="space-y-4">
        {/* Responsive Grid of Cycle Steps - Open, No Nested Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nodes.map((node, idx) => {
            const color = COLOR_MAP[node.color || 'blue'] || COLOR_MAP.blue;
            return (
              <div 
                key={node.id} 
                className={`border-l-3 sm:border-l-4 ${color.accent} pl-3.5 py-1 space-y-1.5 min-w-0 break-words`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${color.badge} shrink-0`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Step {idx + 1}
                  </span>
                </div>
                <h5 className="font-bold text-base text-slate-900 dark:text-slate-100 break-words">
                  {node.label}
                </h5>
                {node.sublabel && (
                  <p className={`text-slate-700 dark:text-slate-300 leading-relaxed break-words ${fontSizeClass}`}>
                    {node.sublabel}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFlowDiagram = () => {
    const nodes = diagram.nodes || [];
    return (
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {nodes.map((node, idx) => {
          const color = COLOR_MAP[node.color || 'indigo'] || COLOR_MAP.indigo;
          const isLast = idx === nodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              <div className={`flex-1 border-l-3 sm:border-l-4 ${color.accent} pl-3.5 py-1 space-y-1.5 min-w-0 break-words`}>
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${color.badge} shrink-0`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs uppercase font-bold text-slate-400">Phase {idx + 1}</span>
                </div>
                <h5 className="font-bold text-base text-slate-900 dark:text-slate-100 break-words">
                  {node.label}
                </h5>
                {node.sublabel && (
                  <p className={`text-slate-700 dark:text-slate-300 leading-relaxed break-words ${fontSizeClass}`}>
                    {node.sublabel}
                  </p>
                )}
              </div>

              {!isLast && (
                <div className="flex items-center justify-center text-slate-400 py-1 md:py-0 shrink-0">
                  <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0 text-slate-400" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quads.map((q, idx) => {
          const color = COLOR_MAP[q.color || 'blue'] || COLOR_MAP.blue;
          return (
            <div key={idx} className={`border-l-3 sm:border-l-4 ${color.accent} pl-3.5 py-1.5 space-y-1 min-w-0 break-words`}>
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${color.badge} shrink-0`} />
                <h5 className="font-bold text-base text-slate-900 dark:text-slate-100 break-words">
                  {q.title}
                </h5>
              </div>
              <p className={`text-slate-700 dark:text-slate-300 leading-relaxed break-words ${fontSizeClass}`}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Side A */}
        <div className="border-l-3 sm:border-l-4 border-rose-500 pl-4 py-1 space-y-2.5 min-w-0 break-words">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-bold text-base sm:text-lg text-rose-900 dark:text-rose-200 flex items-center space-x-1.5">
              <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{comp.sideA.title}</span>
            </h5>
            {comp.sideA.badge && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                {comp.sideA.badge}
              </span>
            )}
          </div>
          {comp.sideA.subtitle && (
            <p className={`text-rose-800/90 dark:text-rose-300/90 italic ${fontSizeClass}`}>
              {comp.sideA.subtitle}
            </p>
          )}
          <ul className={`space-y-2 text-slate-800 dark:text-slate-200 ${fontSizeClass}`}>
            {comp.sideA.items.map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold mt-0.5 shrink-0">✕</span>
                <span className="leading-relaxed break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Side B */}
        <div className="border-l-3 sm:border-l-4 border-emerald-500 pl-4 py-1 space-y-2.5 min-w-0 break-words">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-bold text-base sm:text-lg text-emerald-900 dark:text-emerald-200 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{comp.sideB.title}</span>
            </h5>
            {comp.sideB.badge && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {comp.sideB.badge}
              </span>
            )}
          </div>
          {comp.sideB.subtitle && (
            <p className={`text-emerald-800/90 dark:text-emerald-300/90 italic ${fontSizeClass}`}>
              {comp.sideB.subtitle}
            </p>
          )}
          <ul className={`space-y-2 text-slate-800 dark:text-slate-200 ${fontSizeClass}`}>
            {comp.sideB.items.map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                <span className="leading-relaxed break-words">{item}</span>
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
      <div className="relative pl-5 sm:pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-emerald-500">
        {nodes.map((node, idx) => {
          const color = COLOR_MAP[node.color || 'blue'] || COLOR_MAP.blue;
          return (
            <div key={node.id} className="relative">
              <span className={`absolute -left-5 sm:-left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${color.badge} shadow-xs`} />
              <div className={`border-l-3 sm:border-l-4 ${color.accent} pl-3.5 py-1 space-y-1 min-w-0 break-words`}>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phase {idx + 1}
                  </span>
                  <h5 className="font-bold text-base text-slate-900 dark:text-slate-100 break-words">
                    {node.label}
                  </h5>
                </div>
                {node.sublabel && (
                  <p className={`text-slate-700 dark:text-slate-300 leading-relaxed break-words ${fontSizeClass}`}>
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
    <div className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 min-w-0 break-words">
      {/* Diagram Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3 gap-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 shrink-0">
            <GitFork className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 break-words">
              {diagram.title}
            </h4>
            {diagram.caption && (
              <p className={`text-slate-600 dark:text-slate-400 mt-0.5 break-words ${fontSizeClass}`}>
                {diagram.caption}
              </p>
            )}
          </div>
        </div>
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
