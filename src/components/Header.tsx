import React, { useState, useRef, useEffect } from 'react';
import { Flame, Clock, Moon, Sun, Coffee, Download, Plus, BookOpen, User, LogIn, LogOut, ChevronDown } from 'lucide-react';
import { ThemeMode, UserHabitProfile, UserAccount } from '../types';

interface HeaderProps {
  profile: UserHabitProfile | null;
  currentUser: UserAccount | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenBackup: () => void;
  onOpenImportBook: () => void;
  fontSizeIndex: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentUser,
  onOpenAuth,
  onLogout,
  theme,
  onThemeChange,
  onOpenBackup,
  onOpenImportBook,
  fontSizeIndex,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onGoHome
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const cycleTheme = () => {
    if (theme === 'light') onThemeChange('dark');
    else if (theme === 'dark') onThemeChange('sepia');
    else onThemeChange('light');
  };

  const streak = profile?.dailyStreak ?? 1;
  const todayMinutes = profile?.todayMinutesRead ?? 0;
  const dailyGoal = profile?.dailyGoalMinutes ?? 10;
  const goalPercent = Math.min(100, Math.round((todayMinutes / dailyGoal) * 100));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 backdrop-blur-md transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between w-full min-w-0">
        
        {/* Logo Branding - Clickable to return to Home from any page */}
        <div 
          onClick={onGoHome}
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none group transition-all transform active:scale-95 p-1 -ml-1 sm:p-1.5 sm:-ml-1.5 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 shrink-0"
          title="Return to Home (Library)"
          role="button"
          tabIndex={0}
          aria-label="Return to Home (Library)"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onGoHome?.();
            }
          }}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all duration-200 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          {/* Text Branding - hidden on small mobile to maximize space */}
          <div className="hidden sm:block">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-colors">
                BookBox
              </span>
              <span className="hidden md:inline text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Local
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Zero-Server Microlearning & Synthesis
            </p>
          </div>
        </div>

        {/* Right Controls: Streaks, Goal, Theme, Data, Import */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          
          {/* Daily Streak Badge */}
          <div 
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-400 text-xs font-semibold shrink-0"
            title="Daily Learning Streak"
          >
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streak}d<span className="hidden sm:inline"> Streak</span></span>
          </div>

          {/* Daily Goal Progress */}
          <div 
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
            title={`Daily Goal: ${todayMinutes}/${dailyGoal} minutes read`}
          >
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>{todayMinutes}/{dailyGoal}m</span>
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
          </div>

          {/* Global Text Size Scaler (App Level) */}
          <div 
            className="flex items-center space-x-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs"
            title="Adjust global text size (affects all tabs and reader views)"
          >
            <button
              onClick={onDecreaseFontSize}
              disabled={fontSizeIndex <= 0}
              aria-label="Decrease font size"
              title="Decrease text size (A-)"
              className="px-1.5 sm:px-2 py-1 rounded text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              A-
            </button>
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 px-0.5 sm:px-1 select-none">
              {['SM', 'MD', 'LG', 'XL'][fontSizeIndex]}
            </span>
            <button
              onClick={onIncreaseFontSize}
              disabled={fontSizeIndex >= 3}
              aria-label="Increase font size"
              title="Increase text size (A+)"
              className="px-1.5 sm:px-2 py-1 rounded text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              A+
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={`Current theme: ${theme}. Click to switch.`}
          >
            {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
            {theme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
            {theme === 'sepia' && <Coffee className="w-4 h-4 text-amber-700" />}
          </button>

          {/* Import Book Button */}
          <button
            onClick={onOpenImportBook}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition"
            title="Add Custom Book / Summary"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Book</span>
          </button>

          {/* Backup / Export / Import Button */}
          <button
            onClick={onOpenBackup}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold transition"
            title="Backup & Restore Local Data"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Data Backup</span>
          </button>

          {/* User Account / Auth Section */}
          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer select-none"
                title={`Logged in as ${currentUser.name}`}
              >
                <span className="text-base sm:text-lg leading-none">{currentUser.avatarEmoji || '🦉'}</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline max-w-[110px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-4 z-50 space-y-3 animate-fade-in">
                  <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-3xl">{currentUser.avatarEmoji || '🦉'}</span>
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-sm">{streak}d</span>
                      <span className="text-[10px] text-slate-400">Streak</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block text-sm">{profile?.totalBooksCompleted ?? 0}</span>
                      <span className="text-[10px] text-slate-400">Completed</span>
                    </div>
                  </div>

                  <div className="pt-1 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenBackup();
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition flex items-center space-x-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-500" />
                      <span>Backup & Export Data</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center space-x-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition transform hover:scale-105 cursor-pointer flex items-center space-x-1"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Up</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

