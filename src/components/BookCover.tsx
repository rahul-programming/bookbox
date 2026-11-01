import React, { useState } from 'react';

interface BookCoverProps {
  title: string;
  author: string;
  category?: string;
  coverImageUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  category = 'Productivity',
  coverImageUrl,
  size = 'md',
  className = ''
}) => {
  const [imgError, setImgError] = useState(false);

  // Category palette for realistic book jacket cover designs
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'Productivity':
        return { bg: 'from-blue-800 via-indigo-900 to-slate-950', accent: 'border-blue-400/30 text-blue-200' };
      case 'Psychology':
        return { bg: 'from-purple-900 via-violet-950 to-slate-950', accent: 'border-purple-400/30 text-purple-200' };
      case 'Communication':
        return { bg: 'from-sky-800 via-cyan-950 to-slate-950', accent: 'border-sky-400/30 text-sky-200' };
      case 'Leadership & Career':
        return { bg: 'from-slate-800 via-stone-900 to-slate-950', accent: 'border-amber-400/30 text-amber-200' };
      case 'Business & Strategy':
        return { bg: 'from-amber-800 via-amber-950 to-stone-950', accent: 'border-amber-300/40 text-amber-200' };
      case 'Sales & Persuasion':
        return { bg: 'from-orange-800 via-stone-900 to-stone-950', accent: 'border-orange-400/30 text-orange-200' };
      case 'Money & Investing':
        return { bg: 'from-emerald-800 via-teal-950 to-slate-950', accent: 'border-emerald-300/40 text-emerald-200' };
      case 'Health & Longevity':
        return { bg: 'from-teal-800 via-emerald-950 to-slate-950', accent: 'border-teal-300/40 text-teal-200' };
      case 'Personal Growth':
        return { bg: 'from-indigo-800 via-blue-950 to-slate-950', accent: 'border-indigo-300/30 text-indigo-200' };
      case 'Philosophy':
        return { bg: 'from-stone-800 via-stone-900 to-neutral-950', accent: 'border-stone-400/30 text-stone-300' };
      case 'Spirituality':
        return { bg: 'from-amber-900 via-orange-950 to-stone-950', accent: 'border-amber-400/40 text-amber-300' };
      case 'Creativity & Expression':
        return { bg: 'from-rose-800 via-pink-950 to-slate-950', accent: 'border-rose-400/30 text-rose-200' };
      default:
        return { bg: 'from-slate-800 via-indigo-950 to-slate-950', accent: 'border-blue-400/30 text-blue-200' };
    }
  };

  const sizeClasses = {
    sm: 'w-11 h-16 text-[9px]',
    md: 'w-14 h-20 text-[10px]',
    lg: 'w-20 h-28 text-xs'
  }[size];

  const theme = getCategoryTheme(category);

  // If a real cover image URL is provided and has not errored, render real image
  if (coverImageUrl && !imgError) {
    return (
      <div className={`relative shrink-0 ${sizeClasses} rounded-md overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-slate-900 ${className}`}>
        {/* Left Book Spine Crease Shadow */}
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
        <img
          src={coverImageUrl}
          alt={title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center"
        />
      </div>
    );
  }

  // Realistic typographic book cover page design
  return (
    <div
      className={`relative shrink-0 ${sizeClasses} rounded-md overflow-hidden shadow-md group-hover:shadow-xl group-hover:scale-102 transition-all duration-300 bg-gradient-to-br ${theme.bg} p-1.5 flex flex-col justify-between border border-white/10 ${className}`}
    >
      {/* 3D Book Spine Left Crease */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
      
      {/* Subtle Paper Sheen Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

      {/* Top Spine Frame & Accent */}
      <div className="relative pl-1 pr-0.5 pt-0.5">
        <div className="flex items-center justify-between border-b border-white/15 pb-0.5 mb-1">
          <span className={`text-[7px] font-bold tracking-widest uppercase truncate max-w-[45px] ${theme.accent}`}>
            {category}
          </span>
          <div className="w-1 h-1 rounded-full bg-white/40" />
        </div>
        
        {/* Book Title on Cover */}
        <h4 className="font-serif font-bold text-white text-[9px] leading-[1.15] line-clamp-3 tracking-tight drop-shadow-xs">
          {title}
        </h4>
      </div>

      {/* Bottom Author on Cover */}
      <div className="relative pl-1 pr-0.5 border-t border-white/15 pt-0.5">
        <p className="text-[7.5px] font-sans font-medium text-white/70 uppercase tracking-wider truncate">
          {author.split('&')[0].trim()}
        </p>
      </div>
    </div>
  );
};
