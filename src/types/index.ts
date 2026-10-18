export type Category = 
  | 'Productivity'
  | 'Psychology'
  | 'Finance'
  | 'Philosophy'
  | 'Leadership'
  | 'Strategy';

export type ReaderViewMode = 'blinks' | 'deepdive' | 'cards' | 'mindmap';

export type ThemeMode = 'light' | 'dark' | 'sepia';

export interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  children?: MindMapNode[];
}

export interface Blink {
  id: string;
  order: number;
  headline: string;
  content: string;
  keyTakeaway: string;
  audioSnippetText: string;
}

export interface ReflectionExercise {
  id: string;
  chapterOrder: number;
  title: string;
  prompt: string;
  placeholder?: string;
}

export interface OnePageSummary {
  elevatorPitch: string;
  coreThesis: string;
  keyPillars: string[];
  strengths: string[];
  blindSpotsAndCounterarguments: string[];
}

export interface Book {
  id: string; // unique slug, e.g. 'atomic-habits'
  title: string;
  author: string;
  category: Category;
  coverColor: string; // gradient / color identifier
  coverEmoji: string;
  readingTimeMinutes: number;
  publishedYear: number;
  onePageSummary: OnePageSummary;
  blinks: Blink[];
  mindMap: MindMapNode;
  reflectionExercises: ReflectionExercise[];
  tags: string[];
  isCustom?: boolean;
}

export type IdeaType = 'quote' | 'concept' | 'mental-model' | 'actionable';

export interface IdeaCard {
  id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  category: Category;
  type: IdeaType;
  headline: string;
  body: string;
  quote?: string;
  actionItem?: string;
  tags: string[];
  isStashed: boolean;
  stashBoardIds: string[];
  createdAt: number;
}

export interface StashBoard {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  createdAt: number;
}

export interface UserProgress {
  bookId: string;
  completedBlinkIds: string[];
  currentBlinkIndex: number;
  isCompleted: boolean;
  lastReadTimestamp: number;
  totalTimeSpentSeconds: number;
}

export interface ReflectionAnswer {
  id: string; // `${bookId}_${exerciseId}`
  exerciseId: string;
  bookId: string;
  prompt: string;
  userResponse: string;
  updatedAt: number;
}

export interface UserHabitProfile {
  id: string; // single 'active_profile'
  dailyStreak: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  dailyGoalMinutes: number;
  todayMinutesRead: number;
  totalBooksCompleted: number;
  totalIdeasStashed: number;
  unlockedBadges: string[];
}
