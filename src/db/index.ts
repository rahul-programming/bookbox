import Dexie, { type Table } from 'dexie';
import { Book, IdeaCard, StashBoard, UserProgress, ReflectionAnswer, UserHabitProfile } from '../types';
import { SEED_BOOKS, SEED_IDEAS, SEED_BOARDS } from '../data/seedBooks';

export class BookBoxDB extends Dexie {
  books!: Table<Book, string>;
  ideas!: Table<IdeaCard, string>;
  stashes!: Table<StashBoard, string>;
  progress!: Table<UserProgress, string>;
  exercises!: Table<ReflectionAnswer, string>;
  profile!: Table<UserHabitProfile, string>;

  constructor() {
    super('BookBoxDatabase');

    this.version(1).stores({
      books: 'id, category, publishedYear, isCustom',
      ideas: 'id, bookId, category, type, isStashed, *stashBoardIds',
      stashes: 'id, name, createdAt',
      progress: 'bookId, isCompleted, lastReadTimestamp',
      exercises: 'id, exerciseId, bookId, updatedAt',
      profile: 'id'
    });
  }
}

export const db = new BookBoxDB();

export async function initDatabase(): Promise<void> {
  const booksCount = await db.books.count();
  if (booksCount === 0) {
    // Populate seed library
    await db.books.bulkAdd(SEED_BOOKS);
    await db.ideas.bulkAdd(SEED_IDEAS);
    await db.stashes.bulkAdd(SEED_BOARDS);

    // Initial habit profile
    const today = new Date().toISOString().split('T')[0];
    const initialProfile: UserHabitProfile = {
      id: 'active_profile',
      dailyStreak: 3, // start with motivating 3-day momentum
      lastActiveDate: today,
      dailyGoalMinutes: 10,
      todayMinutesRead: 4,
      totalBooksCompleted: 1,
      totalIdeasStashed: SEED_IDEAS.filter(i => i.isStashed).length,
      unlockedBadges: ['first_read', 'habit_starter', 'idea_collector']
    };
    await db.profile.put(initialProfile);

    // Initial progress on Atomic Habits
    const initialProgress: UserProgress = {
      bookId: 'atomic-habits',
      completedBlinkIds: ['ah-ch-1'],
      currentBlinkIndex: 0,
      isCompleted: false,
      lastReadTimestamp: Date.now(),
      totalTimeSpentSeconds: 180,
      completedActionIds: []
    };
    await db.progress.put(initialProgress);
  } else {
    // Synchronize updated seed books (with expanded chapters, diagrams, stories & action items)
    for (const b of SEED_BOOKS) {
      const existing = await db.books.get(b.id);
      if (!existing || (b.blinks && existing.blinks.length < b.blinks.length) || (b.actionItems && !existing.actionItems)) {
        await db.books.put(b);
      }
    }
  }
}

export async function exportDatabaseBackup(): Promise<string> {
  const books = await db.books.toArray();
  const ideas = await db.ideas.toArray();
  const stashes = await db.stashes.toArray();
  const progress = await db.progress.toArray();
  const exercises = await db.exercises.toArray();
  const profile = await db.profile.toArray();

  const backupData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      books,
      ideas,
      stashes,
      progress,
      exercises,
      profile
    }
  };

  return JSON.stringify(backupData, null, 2);
}

export async function importDatabaseBackup(jsonString: string): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.data) return false;

    await db.transaction('rw', [db.books, db.ideas, db.stashes, db.progress, db.exercises, db.profile], async () => {
      if (parsed.data.books?.length) await db.books.bulkPut(parsed.data.books);
      if (parsed.data.ideas?.length) await db.ideas.bulkPut(parsed.data.ideas);
      if (parsed.data.stashes?.length) await db.stashes.bulkPut(parsed.data.stashes);
      if (parsed.data.progress?.length) await db.progress.bulkPut(parsed.data.progress);
      if (parsed.data.exercises?.length) await db.exercises.bulkPut(parsed.data.exercises);
      if (parsed.data.profile?.length) await db.profile.bulkPut(parsed.data.profile);
    });

    return true;
  } catch (error) {
    console.error('Failed to import backup:', error);
    return false;
  }
}

