import React from 'react';

interface HighlightedSentenceProps {
  text: string;
  isActive: boolean;
  highlightRange?: { start: number; length: number };
  className?: string;
  paragraphClassName?: string;
}

export const HighlightedSentence: React.FC<HighlightedSentenceProps> = ({
  text,
  isActive,
  highlightRange,
  className = '',
  paragraphClassName = ''
}) => {
  if (!text) return null;

  if (!isActive || !highlightRange || highlightRange.start < 0 || highlightRange.length <= 0) {
    return (
      <div className={className}>
        {text.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className={paragraphClassName}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  const start = Math.max(0, highlightRange.start);
  const end = Math.min(text.length, start + highlightRange.length);

  const paragraphs = text.split('\n\n');
  let currentOffset = 0;

  return (
    <div className={className}>
      {paragraphs.map((para, idx) => {
        const pStart = currentOffset;
        const pEnd = pStart + para.length;
        // account for '\n\n' between paragraphs
        currentOffset = pEnd + 2;

        const hasOverlap = start < pEnd && end > pStart;

        if (!hasOverlap) {
          return (
            <p key={idx} className={paragraphClassName}>
              {para}
            </p>
          );
        }

        const relStart = Math.max(0, start - pStart);
        const relEnd = Math.min(para.length, end - pStart);

        const beforePara = para.slice(0, relStart);
        const highlightedPara = para.slice(relStart, relEnd);
        const afterPara = para.slice(relEnd);

        return (
          <p key={idx} className={paragraphClassName}>
            <span>{beforePara}</span>
            <mark className="bg-amber-200/90 dark:bg-amber-900/70 dark:text-amber-100 text-slate-900 px-1 py-0.5 rounded shadow-xs transition-all duration-200 font-medium">
              {highlightedPara}
            </mark>
            <span>{afterPara}</span>
          </p>
        );
      })}
    </div>
  );
};
