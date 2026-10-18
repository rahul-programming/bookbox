import React from 'react';
import { BookMarked, Lightbulb, FolderKanban, Award } from 'lucide-react';

export type MainTab = 'library' | 'ideas' | 'stashes' | 'growth';

interface NavigationTabsProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  stashedCount?: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  stashedCount = 0
}) => {
  const tabs = [
    {
      id: 'library' as MainTab,
      label: 'Library',
      sublabel: 'Books & Blinks',
      icon: BookMarked
    },
    {
      id: 'ideas' as MainTab,
      label: 'Idea Feed',
      sublabel: 'Deepstash Cards',
      icon: Lightbulb
    },
    {
      id: 'stashes' as MainTab,
      label: 'My Stashes',
      sublabel: 'Second Brain',
      icon: FolderKanban,
      badge: stashedCount > 0 ? stashedCount : undefined
    },
    {
      id: 'growth' as MainTab,
      label: 'Habit & Growth',
      sublabel: 'Headway Streaks',
      icon: Award
    }
  ];

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto py-2 no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-3 px-3 sm:px-4 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="ml-1.5 px-2 py-0.5 text-[11px] font-bold rounded-full bg-blue-600 text-white dark:bg-blue-500">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

