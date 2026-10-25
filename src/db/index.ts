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
  // 1. Request persistent browser storage to protect IndexedDB and LocalStorage against OS/browser auto-eviction on restart
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      await navigator.storage.persist();
    } catch {
      // Best-effort storage request
    }
  }

  // 2. Synchronize user accounts between IndexedDB and LocalStorage Vault
  await syncUserVault();

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

// Pure-JS SHA-256 fallback when Web Crypto API (crypto.subtle) is unavailable (e.g. Insecure HTTP LAN, file://, webviews)
function sha256Fallback(str: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i = 0, j = 0;
  let result = '';

  const words: number[] = [];
  const asciiBitLength = str.length * 8;
  let hash: number[] = [];
  let k: number[] = [];
  let primeCounter = 0;

  const isComposite: Record<number, boolean> = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = true;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  str += '\x80';
  while (str.length % 64 - 56) str += '\x00';
  for (i = 0; i < str.length; i++) {
    j = str.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words.length] = ((asciiBitLength / maxWord) | 0);
  words[words.length] = (asciiBitLength | 0);

  for (j = 0; j < words.length;) {
    const w = words.slice(j, j += 16);
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
      const temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (8 * j)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

export async function hashPassword(password: string): Promise<string> {
  const salted = password + "_bookbox_salt_2026";
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
      const encoder = new TextEncoder();
      const data = encoder.encode(salted);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('Web Crypto API failed, falling back to pure SHA-256:', e);
  }
  return sha256Fallback(salted);
}

// LocalStorage User Vault Keys for Dual-Layer Resilience across restarts & reboots
const USERS_VAULT_KEY = 'bookbox_user_vault_v1';
const ACTIVE_SESSION_KEY = 'bookbox_active_user_session';
const ACTIVE_USER_ID_KEY = 'bookbox_active_user_id';

export function getLocalUserVault(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_VAULT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalUserVault(users: UserAccount[]): void {
  try {
    localStorage.setItem(USERS_VAULT_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn('Failed to save user vault to localStorage:', e);
  }
}

export async function persistUser(user: UserAccount): Promise<void> {
  // 1. IndexedDB
  try {
    await db.users.put(user);
  } catch (e) {
    console.warn('Failed to write user to IndexedDB:', e);
  }

  // 2. LocalStorage Vault
  try {
    const vault = getLocalUserVault();
    const idx = vault.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      vault[idx] = user;
    } else {
      vault.push(user);
    }
    saveLocalUserVault(vault);
  } catch (e) {
    console.warn('Failed to write user to localStorage vault:', e);
  }
}

export async function syncUserVault(): Promise<void> {
  try {
    const localUsers = getLocalUserVault();
    let dbUsers: UserAccount[] = [];
    try {
      dbUsers = await db.users.toArray();
    } catch {
      dbUsers = [];
    }

    const mergedMap = new Map<string, UserAccount>();

    for (const u of dbUsers) {
      mergedMap.set(u.email.toLowerCase(), u);
    }

    for (const u of localUsers) {
      const existing = mergedMap.get(u.email.toLowerCase());
      if (!existing || (u.lastLoginAt || 0) >= (existing.lastLoginAt || 0)) {
        mergedMap.set(u.email.toLowerCase(), u);
      }
    }

    const allMerged = Array.from(mergedMap.values());
    if (allMerged.length > 0) {
      saveLocalUserVault(allMerged);
      for (const u of allMerged) {
        await db.users.put(u).catch(() => {});
      }
    }
  } catch (e) {
    console.warn('Failed to sync user vault:', e);
  }
}

export function getActiveUserId(): string | null {
  return localStorage.getItem(ACTIVE_USER_ID_KEY) || null;
}

export function setActiveUserId(id: string | null): void {
  if (id) {
    localStorage.setItem(ACTIVE_USER_ID_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_USER_ID_KEY);
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  }
}

export function getActiveUserSession(): UserAccount | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setActiveUserSession(user: UserAccount | null): void {
  if (user) {
    setActiveUserId(user.id);
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));
    } catch {}
  } else {
    setActiveUserId(null);
  }
}

export async function getActiveUser(): Promise<UserAccount | null> {
  const cached = getActiveUserSession();
  const id = getActiveUserId() || cached?.id;
  if (!id) return null;

  try {
    const user = await db.users.get(id);
    if (user) {
      setActiveUserSession(user);
      return user;
    }
  } catch (e) {
    console.warn('IndexedDB read error in getActiveUser:', e);
  }

  // Fallback to local vault
  const vault = getLocalUserVault();
  const found = vault.find(u => u.id === id || (cached && u.email === cached.email));
  if (found) {
    await db.users.put(found).catch(() => {});
    setActiveUserSession(found);
    return found;
  }

  if (cached) return cached;
  return null;
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

  // Check both IndexedDB and LocalStorage vault for existing account
  let existing = await db.users.where('email').equals(cleanEmail).first().catch(() => undefined);
  if (!existing) {
    const vault = getLocalUserVault();
    existing = vault.find(u => u.email.toLowerCase() === cleanEmail);
  }

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

  await persistUser(user);
  setActiveUserSession(user);

  // If user requested migration of guest data, copy guest progress and habit profile
  if (migrateGuestData) {
    try {
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
    } catch (e) {
      console.warn('Error during guest data migration:', e);
    }
  } else {
    await getUserProfile(user.id);
  }

  return { success: true, user };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; user?: UserAccount; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check IndexedDB
  let user = await db.users.where('email').equals(cleanEmail).first().catch(() => undefined);

  // 2. Fallback to LocalStorage vault
  if (!user) {
    const vault = getLocalUserVault();
    user = vault.find(u => u.email.toLowerCase() === cleanEmail);
    if (user) {
      await db.users.put(user).catch(() => {});
    }
  }

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

  await persistUser(updatedUser);
  setActiveUserSession(updatedUser);

  return { success: true, user: updatedUser };
}

export async function logout(): Promise<void> {
  setActiveUserSession(null);
}

export async function getAllUsers(): Promise<UserAccount[]> {
  try {
    const dbUsers = await db.users.toArray();
    if (dbUsers.length > 0) return dbUsers;
  } catch {}
  return getLocalUserVault();
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

