import React from 'react';
import { Flame, Clock, Moon, Sun, Coffee, Download, Plus, BookOpen } from 'lucide-react';
import { ThemeMode, UserHabitProfile } from '../types';

interface HeaderProps {
  profile: UserHabitProfile | null;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenBackup: () => void;
  onOpenImportBook: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  theme,
  onThemeChange,
  onOpenBackup,
  onOpenImportBook
}) => {
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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Branding */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                BookBox
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Local
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Zero-Server Microlearning & Synthesis
            </p>
          </div>
        </div>

        {/* Right Controls: Streaks, Goal, Theme, Data, Import */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Daily Streak Badge */}
          <div 
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-400 text-xs font-semibold"
            title="Daily Learning Streak"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streak}d Streak</span>
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
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold transition"
            title="Backup & Restore Local Data"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Data Backup</span>
          </button>

        </div>

      </div>
    </header>
  );
};
