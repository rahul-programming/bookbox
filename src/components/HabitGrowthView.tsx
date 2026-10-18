import React from 'react';
import { UserHabitProfile } from '../types';
import { db } from '../db';
import { Flame, Clock, Trophy, Award, CheckCircle2, Target, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HabitGrowthViewProps {
  profile: UserHabitProfile | null;
  onProfileUpdated: () => void;
}

export const HabitGrowthView: React.FC<HabitGrowthViewProps> = ({ profile, onProfileUpdated }) => {
  const streak = profile?.dailyStreak ?? 1;
  const todayMinutes = profile?.todayMinutesRead ?? 0;
  const dailyGoal = profile?.dailyGoalMinutes ?? 10;
  const completedBooks = profile?.totalBooksCompleted ?? 0;
  const totalStashes = profile?.totalIdeasStashed ?? 0;
  const goalPercent = Math.min(100, Math.round((todayMinutes / dailyGoal) * 100));

  const badges = [
    {
      id: 'first_read',
      name: 'Curious Explorer',
      description: 'Completed your first book summary',
      icon: '🌱',
      unlocked: completedBooks >= 1
    },
    {
      id: 'habit_starter',
      name: 'Momentum Builder',
      description: 'Kept an unbroken 3-day reading streak',
      icon: '🔥',
      unlocked: streak >= 3
    },
    {
      id: 'idea_collector',
      name: 'Second Brain Curator',
      description: 'Stashed 5 or more atomic idea cards',
      icon: '💎',
      unlocked: totalStashes >= 5
    },
    {
      id: 'bookworm',
      name: 'Master Synthesizer',
      description: 'Completed 5 books in the library',
      icon: '🏛️',
      unlocked: completedBooks >= 5
    }
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

  const handleClaimStreak = async () => {
    if (!profile) return;
    profile.dailyStreak += 1;
    profile.todayMinutesRead = Math.max(profile.todayMinutesRead, dailyGoal);
    await db.profile.put(profile);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    onProfileUpdated();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-bold uppercase tracking-wider text-amber-100">
            <Trophy className="w-4 h-4" />
            <span>Microlearning Daily Habits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            {streak} Day Reading Streak!
          </h2>
          <p className="text-sm text-amber-100 max-w-lg">
            Consistency beats intensity. Small 15-minute daily reads compound into life-changing mental models over a year.
          </p>
        </div>

        <button
          onClick={handleClaimStreak}
          className="px-6 py-3.5 rounded-2xl bg-white text-orange-600 hover:bg-amber-50 font-black text-sm shadow-lg shadow-black/10 transition transform hover:scale-105 active:scale-95 flex items-center space-x-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span>Claim Today's Streak</span>
        </button>
      </div>

      {/* 7-Day Habit Tracker Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Weekly Consistency Tracker
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Target: 10m/day</span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-2">
          {daysOfWeek.map((day, idx) => {
            const isPast = idx < todayIndex;
            const isToday = idx === todayIndex;
            const isDone = isPast || (isToday && todayMinutes >= dailyGoal);

            return (
              <div key={day} className="flex flex-col items-center space-y-2">
                <span className="text-xs font-semibold text-slate-400">{day}</span>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                    isDone
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20'
                      : isToday
                      ? 'border-2 border-dashed border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Goal & Progress Meter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Goal Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Daily Goal</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {todayMinutes}
            </span>
            <span className="text-sm font-semibold text-slate-400"> / {dailyGoal} min</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${goalPercent}%` }}
            />
          </div>
        </div>

        {/* Completed Books */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Completed Summaries</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {completedBooks}
            </span>
            <span className="text-sm font-semibold text-slate-400"> Books</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Finished key takeaways & blinks
          </p>
        </div>

        {/* Stashed Ideas */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Stashed Insights</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {totalStashes}
            </span>
            <span className="text-sm font-semibold text-slate-400"> Ideas</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Curated into custom boards
          </p>
        </div>

      </div>

      {/* Badges Cabinet */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            Milestone Badges Cabinet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unlock achievements by consistently reading, finishing summaries, and curating ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border flex flex-col items-center text-center transition ${
                badge.unlocked
                  ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {badge.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {badge.description}
              </p>
              <span className={`text-[10px] font-bold uppercase tracking-wider mt-3 px-2 py-0.5 rounded-full ${
                badge.unlocked
                  ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {badge.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

