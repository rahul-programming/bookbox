export type Category = 
  | 'Productivity'
  | 'Psychology'
  | 'Finance'
  | 'Philosophy'
  | 'Leadership'
  | 'Strategy';

export type ReaderViewMode = 'blinks' | 'deepdive' | 'actionable' | 'cards' | 'mindmap';

export type ThemeMode = 'light' | 'dark' | 'sepia';

export interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  children?: MindMapNode[];
}

export type DiagramType = 'cycle' | 'flow' | 'matrix' | 'comparison' | 'timeline';

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  color?: 'emerald' | 'blue' | 'indigo' | 'amber' | 'purple' | 'rose' | 'cyan';
}

export interface DiagramQuadrant {
  title: string;
  description: string;
  color: 'emerald' | 'blue' | 'indigo' | 'amber' | 'purple' | 'rose' | 'cyan';
}

export interface DiagramComparisonSide {
  title: string;
  subtitle?: string;
  badge?: string;
  items: string[];
}

export interface ChapterDiagram {
  type: DiagramType;
  title: string;
  caption?: string;
  nodes?: DiagramNode[];
  quadrants?: DiagramQuadrant[];
  comparison?: {
    sideA: DiagramComparisonSide;
    sideB: DiagramComparisonSide;
  };
}

export interface Blink {
  id: string;
  order: number;
  chapterNumber?: number;
  headline: string;
  content: string;
  keyTakeaway: string;
  audioSnippetText: string;
  diagram?: ChapterDiagram;
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

export type ActionCategory = 'quick-win' | 'daily-routine' | 'environment' | 'audit' | 'system';

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: ActionCategory;
  timeEstimateMinutes: number;
  stepByStep: string[];
  sourceChapter?: string;
  linkedStory?: string;
}

export interface BookStory {
  id: string;
  title: string;
  charactersOrSubject: string;
  historicalPeriodOrSetting?: string;
  narrative: string;
  coreLesson: string;
  sourceChapter: string;
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
  actionItems?: ActionItem[];
  stories?: BookStory[];
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
  completedActionIds?: string[];
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

