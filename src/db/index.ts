import Dexie, { type Table } from 'dexie';
import { 
  Book, 
  IdeaCard, 
  StashBoard, 
  UserProgress, 
  ReflectionAnswer, 
  UserHabitProfile,
  UserAccount,
  UserScopedStash
} from '../types';
import { SEED_BOOKS, SEED_IDEAS, SEED_BOARDS } from '../data/seedBooks';

export class BookBoxDB extends Dexie {
  books!: Table<Book, string>;
  ideas!: Table<IdeaCard, string>;
  stashes!: Table<StashBoard, string>;
  progress!: Table<UserProgress, string>;
  exercises!: Table<ReflectionAnswer, string>;
  profile!: Table<UserHabitProfile, string>;
  users!: Table<UserAccount, string>;
  userStashes!: Table<UserScopedStash, string>;

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

    this.version(2).stores({
      users: 'id, email, name, createdAt',
      userStashes: 'id, userId, ideaId, isStashed, *stashBoardIds'
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
    // Synchronize updated seed books (with latest engaging, simple content)
    for (const b of SEED_BOOKS) {
      const existing = await db.books.get(b.id);
      if (!existing || !existing.isCustom) {
        await db.books.put(b);
      }
      if (b.ideaCards && b.ideaCards.length > 0) {
        for (const card of b.ideaCards) {
          const existingIdea = await db.ideas.get(card.id);
          if (!existingIdea) {
            await db.ideas.put(card);
          } else if (existingIdea.isStashed) {
            // Keep user stash state while refreshing content
            await db.ideas.put({ ...card, isStashed: true, stashBoardIds: existingIdea.stashBoardIds });
          } else {
            await db.ideas.put(card);
          }
        }
      }
    }

    // 1. Explicitly migrate known legacy/renamed book IDs
    const legacyIdMap: Record<string, string> = {
      'psychology-of-money': 'the-psychology-of-money-timeless-lessons-on-wealth-greed-and'
    };

    for (const [legacyId, targetId] of Object.entries(legacyIdMap)) {
      const legacyBook = await db.books.get(legacyId);
      if (legacyBook) {
        // Migrate user reading progress
        const legacyProg = await db.progress.get(legacyId);
        if (legacyProg) {
          const targetProg = await db.progress.get(targetId);
          if (!targetProg) {
            await db.progress.put({ ...legacyProg, bookId: targetId });
          }
          await db.progress.delete(legacyId);
        }
        // Remove old orphan ideas linked to legacy ID
        const legacyIdeas = await db.ideas.where('bookId').equals(legacyId).toArray();
        for (const idea of legacyIdeas) {
          await db.ideas.delete(idea.id);
        }
        // Delete the duplicate book
        await db.books.delete(legacyId);
      }
    }

    // 2. General deduplication across db.books by normalized title + author
    const allCurrentBooks = await db.books.toArray();
    const booksByNormalizedTitle = new Map<string, Book[]>();
    for (const book of allCurrentBooks) {
      const normKey = `${book.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}___${book.author.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      if (!booksByNormalizedTitle.has(normKey)) {
        booksByNormalizedTitle.set(normKey, []);
      }
      booksByNormalizedTitle.get(normKey)!.push(book);
    }

    for (const duplicates of booksByNormalizedTitle.values()) {
      if (duplicates.length > 1) {
        // Prefer book present in SEED_BOOKS or with more blinks
        const authoritative = duplicates.find(d => SEED_BOOKS.some(sb => sb.id === d.id)) ||
                              [...duplicates].sort((a, b) => (b.blinks?.length || 0) - (a.blinks?.length || 0))[0];

        for (const dup of duplicates) {
          if (dup.id !== authoritative.id) {
            // Migrate any progress
            const dupProg = await db.progress.get(dup.id);
            if (dupProg) {
              const authProg = await db.progress.get(authoritative.id);
              if (!authProg) {
                await db.progress.put({ ...dupProg, bookId: authoritative.id });
              }
              await db.progress.delete(dup.id);
            }
            await db.books.delete(dup.id);
          }
        }
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
  const users = await db.users.toArray();
  const userStashes = await db.userStashes.toArray();
  const activeUserId = getActiveUserId();

  const backupData = {
    version: 2,
    exportedAt: new Date().toISOString(),
    activeUserId,
    data: {
      books,
      ideas,
      stashes,
      progress,
      exercises,
      profile,
      users,
      userStashes
    }
  };

  return JSON.stringify(backupData, null, 2);
}

export async function importDatabaseBackup(jsonString: string): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.data) return false;

    await db.transaction('rw', [
      db.books, 
      db.ideas, 
      db.stashes, 
      db.progress, 
      db.exercises, 
      db.profile, 
      db.users, 
      db.userStashes
    ], async () => {
      if (parsed.data.books?.length) await db.books.bulkPut(parsed.data.books);
      if (parsed.data.ideas?.length) await db.ideas.bulkPut(parsed.data.ideas);
      if (parsed.data.stashes?.length) await db.stashes.bulkPut(parsed.data.stashes);
      if (parsed.data.progress?.length) await db.progress.bulkPut(parsed.data.progress);
      if (parsed.data.exercises?.length) await db.exercises.bulkPut(parsed.data.exercises);
      if (parsed.data.profile?.length) await db.profile.bulkPut(parsed.data.profile);
      if (parsed.data.users?.length) await db.users.bulkPut(parsed.data.users);
      if (parsed.data.userStashes?.length) await db.userStashes.bulkPut(parsed.data.userStashes);
    });

    if (parsed.activeUserId) {
      setActiveUserId(parsed.activeUserId);
    } else if (parsed.data.users?.length) {
      const sortedUsers = [...parsed.data.users].sort((a, b) => (b.lastLoginAt || 0) - (a.lastLoginAt || 0));
      if (sortedUsers[0]) {
        setActiveUserId(sortedUsers[0].id);
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to import backup:', error);
    return false;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_bookbox_salt_2026");
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getActiveUserId(): string | null {
  return localStorage.getItem('bookbox_active_user_id') || null;
}

export function setActiveUserId(id: string | null): void {
  if (id) {
    localStorage.setItem('bookbox_active_user_id', id);
  } else {
    localStorage.removeItem('bookbox_active_user_id');
  }
}

export async function getActiveUser(): Promise<UserAccount | null> {
  const id = getActiveUserId();
  if (!id) return null;
  const user = await db.users.get(id);
  return user || null;
}

export async function signUp(
  name: string,
  email: string,
  password: string,
  avatarEmoji = '🦉',
  migrateGuestData = true
): Promise<{ success: boolean; user?: UserAccount; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!name.trim()) {
    return { success: false, error: 'Please enter your name.' };
  }
  if (password.length < 4) {
    return { success: false, error: 'Password must be at least 4 characters long.' };
  }

  const existing = await db.users.where('email').equals(cleanEmail).first();
  if (existing) {
    return { success: false, error: 'An account with this email already exists. Please log in.' };
  }

  const passwordHash = await hashPassword(password);
  const now = Date.now();
  const user: UserAccount = {
    id: `usr_${now}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: cleanEmail,
    passwordHash,
    avatarEmoji,
    createdAt: now,
    lastLoginAt: now
  };

  await db.users.put(user);
  setActiveUserId(user.id);

  // If user requested migration of guest data, copy guest progress and habit profile
  if (migrateGuestData) {
    const guestProgress = await db.progress.filter(p => !p.userId || p.userId === 'guest' || !p.bookId.includes('___')).toArray();
    for (const gp of guestProgress) {
      const cleanBookId = gp.actualBookId || gp.bookId.replace('guest___', '');
      const userKey = `${user.id}___${cleanBookId}`;
      await db.progress.put({
        ...gp,
        bookId: userKey,
        actualBookId: cleanBookId,
        userId: user.id
      });
    }

    const guestProfile = await db.profile.get('active_profile');
    if (guestProfile) {
      await db.profile.put({
        ...guestProfile,
        id: `profile_${user.id}`
      });
    }
  } else {
    // Initialize fresh profile
    await getUserProfile(user.id);
  }

  return { success: true, user };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; user?: UserAccount; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const user = await db.users.where('email').equals(cleanEmail).first();
  if (!user) {
    return { success: false, error: 'No account found with this email. Please check or sign up.' };
  }

  const hash = await hashPassword(password);
  if (user.passwordHash !== hash) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  const updatedUser: UserAccount = {
    ...user,
    lastLoginAt: Date.now()
  };
  await db.users.put(updatedUser);
  setActiveUserId(user.id);

  return { success: true, user: updatedUser };
}

export async function logout(): Promise<void> {
  setActiveUserId(null);
}

export async function getAllUsers(): Promise<UserAccount[]> {
  return db.users.toArray();
}

export async function getUserProgressMap(userId: string | null): Promise<Record<string, UserProgress>> {
  const all = await db.progress.toArray();
  const map: Record<string, UserProgress> = {};
  
  if (userId) {
    const prefix = `${userId}___`;
    for (const p of all) {
      if (p.userId === userId || p.bookId.startsWith(prefix)) {
        const cleanBookId = p.actualBookId || p.bookId.replace(prefix, '');
        map[cleanBookId] = { ...p, bookId: cleanBookId, actualBookId: cleanBookId };
      }
    }
  } else {
    for (const p of all) {
      if (!p.userId || p.userId === 'guest' || !p.bookId.includes('___')) {
        const cleanBookId = p.actualBookId || p.bookId.replace('guest___', '');
        map[cleanBookId] = { ...p, bookId: cleanBookId, actualBookId: cleanBookId };
      }
    }
  }
  return map;
}

export async function saveUserProgress(
  actualBookId: string, 
  updates: Partial<UserProgress>, 
  userId?: string | null
): Promise<UserProgress> {
  const uid = userId !== undefined ? userId : getActiveUserId();
  const key = uid ? `${uid}___${actualBookId}` : actualBookId;
  const existing = await db.progress.get(key) || (!uid ? await db.progress.get(actualBookId) : null);
  
  const updated: UserProgress = {
    bookId: key,
    actualBookId: actualBookId,
    userId: uid || 'guest',
    completedBlinkIds: updates.completedBlinkIds ?? existing?.completedBlinkIds ?? [],
    currentBlinkIndex: updates.currentBlinkIndex ?? existing?.currentBlinkIndex ?? 0,
    isCompleted: updates.isCompleted ?? existing?.isCompleted ?? false,
    lastReadTimestamp: updates.lastReadTimestamp ?? Date.now(),
    totalTimeSpentSeconds: updates.totalTimeSpentSeconds ?? existing?.totalTimeSpentSeconds ?? 0,
    completedActionIds: updates.completedActionIds ?? existing?.completedActionIds ?? [],
    isFavorite: updates.isFavorite ?? existing?.isFavorite ?? false,
    isCurrentlyReading: updates.isCurrentlyReading ?? existing?.isCurrentlyReading ?? false,
  };

  await db.progress.put(updated);
  return { ...updated, bookId: actualBookId };
}

export async function toggleFavorite(actualBookId: string, userId?: string | null): Promise<boolean> {
  const uid = userId !== undefined ? userId : getActiveUserId();
  const key = uid ? `${uid}___${actualBookId}` : actualBookId;
  const existing = await db.progress.get(key) || (!uid ? await db.progress.get(actualBookId) : null);
  const nextVal = !(existing?.isFavorite ?? false);
  
  await saveUserProgress(actualBookId, { isFavorite: nextVal }, uid);
  return nextVal;
}

export async function toggleCurrentlyReading(actualBookId: string, userId?: string | null): Promise<boolean> {
  const uid = userId !== undefined ? userId : getActiveUserId();
  const key = uid ? `${uid}___${actualBookId}` : actualBookId;
  const existing = await db.progress.get(key) || (!uid ? await db.progress.get(actualBookId) : null);
  const effectiveCurrently = existing?.isCurrentlyReading ?? ((existing?.completedBlinkIds.length ?? 0) > 0 && !existing?.isCompleted);
  const nextVal = !effectiveCurrently;

  await saveUserProgress(actualBookId, { 
    isCurrentlyReading: nextVal,
    lastReadTimestamp: nextVal ? Date.now() : (existing?.lastReadTimestamp ?? Date.now())
  }, uid);
  return nextVal;
}

export async function getUserProfile(userId: string | null): Promise<UserHabitProfile> {
  const profileKey = userId ? `profile_${userId}` : 'active_profile';
  let profile = await db.profile.get(profileKey);
  if (!profile) {
    const today = new Date().toISOString().split('T')[0];
    profile = {
      id: profileKey,
      dailyStreak: 1,
      lastActiveDate: today,
      dailyGoalMinutes: 10,
      todayMinutesRead: 0,
      totalBooksCompleted: 0,
      totalIdeasStashed: 0,
      unlockedBadges: ['first_read']
    };
    await db.profile.put(profile);
  }
  return profile;
}

export async function saveUserProfile(profile: UserHabitProfile, userId?: string | null): Promise<void> {
  const uid = userId !== undefined ? userId : getActiveUserId();
  const profileKey = uid ? `profile_${uid}` : 'active_profile';
  await db.profile.put({ ...profile, id: profileKey });
}

export async function getUserStashes(userId: string | null): Promise<UserScopedStash[]> {
  if (!userId) {
    // Return all stashes from db.ideas where isStashed == 1
    const stashed = await db.ideas.where('isStashed').equals(1).toArray();
    return stashed.map(i => ({
      id: `guest___${i.id}`,
      userId: 'guest',
      ideaId: i.id,
      isStashed: true,
      stashBoardIds: i.stashBoardIds || [],
      createdAt: i.createdAt || Date.now()
    }));
  }
  return db.userStashes.where('userId').equals(userId).toArray();
}

export async function setUserIdeaStash(
  ideaId: string, 
  isStashed: boolean, 
  stashBoardIds: string[], 
  userId?: string | null
): Promise<void> {
  const uid = userId !== undefined ? userId : getActiveUserId();
  if (uid) {
    const id = `${uid}___${ideaId}`;
    await db.userStashes.put({
      id,
      userId: uid,
      ideaId,
      isStashed,
      stashBoardIds,
      createdAt: Date.now()
    });
  }
  // Also keep db.ideas updated
  await db.ideas.update(ideaId, { isStashed, stashBoardIds });
}

export async function getUserBoards(userId: string | null): Promise<StashBoard[]> {
  const allBoards = await db.stashes.toArray();
  return allBoards.filter(b => !b.userId || b.userId === 'system' || b.userId === userId);
}

export async function addUserBoard(board: StashBoard, userId?: string | null): Promise<void> {
  const uid = userId !== undefined ? userId : getActiveUserId();
  await db.stashes.put({ ...board, userId: uid || undefined });
}

