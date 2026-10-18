import React from 'react';
import { Book, UserProgress } from '../types';
import { Clock, CheckCircle2, ChevronRight, Sparkles, Volume2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  progress?: UserProgress;
  onSelect: (book: Book) => void;
  onStartAudio?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, progress, onSelect, onStartAudio }) => {
  const totalBlinks = book.blinks.length;
  const completedBlinks = progress?.completedBlinkIds.length ?? 0;
  const isCompleted = progress?.isCompleted || (totalBlinks > 0 && completedBlinks === totalBlinks);
  const percent = totalBlinks > 0 ? Math.round((completedBlinks / totalBlinks) * 100) : 0;

  return (
    <div
      onClick={() => onSelect(book)}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-xs hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Header: Cover Emoji & Category Badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className={`w-14 h-18 rounded-xl bg-gradient-to-br ${book.coverColor} flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform duration-300`}>
          {book.coverEmoji}
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
            {book.category}
          </span>
          <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{book.readingTimeMinutes} min</span>
          </div>
        </div>
      </div>

      {/* Book Title & Author */}
      <div className="flex-1 mb-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 mb-2">
          {book.author} · {book.publishedYear}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {book.onePageSummary.elevatorPitch}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {book.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer: Progress, Audio Preview and CTA */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
        {isCompleted ? (
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed</span>
          </div>
        ) : completedBlinks > 0 ? (
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {completedBlinks}/{totalBlinks}
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>15-min Read</span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {onStartAudio && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartAudio(book);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
              title="Listen to summary"
            >
              <Volume2 className="w-4 h-4 text-blue-500" />
            </button>
          )}

          <div className="flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            <span>Read</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
