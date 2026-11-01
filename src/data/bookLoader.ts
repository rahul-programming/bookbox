import { Book } from '../types';
import { db } from '../db';
import { BOOK_LOADER_MAP } from './bookCatalog';

// Dynamic Vite code-splitting imports for all expanded book files
const bookModules = import.meta.glob<{ [key: string]: any }>('./books/*Expanded.ts');

export async function loadFullBook(bookId: string): Promise<Book | null> {
  // 1. Check if the full book is already cached in IndexedDB with full content
  try {
    const existing = await db.books.get(bookId);
    if (existing && existing.isLoaded && existing.blinks && existing.blinks.length > 0) {
      return existing;
    }
  } catch (err) {
    console.warn(`[bookLoader] Error reading ${bookId} from IndexedDB:`, err);
  }

  // 2. Resolve the dynamic import path from the catalog mapping
  const relPath = BOOK_LOADER_MAP[bookId];
  if (!relPath || !bookModules[relPath]) {
    console.warn(`[bookLoader] No dynamic loader found for book '${bookId}' at path '${relPath}'`);
    return (await db.books.get(bookId)) || null;
  }

  // 3. Dynamically fetch the isolated book chunk on-demand
  try {
    const module = await bookModules[relPath]();
    let exportedBook: Book | null = null;
    if (module.default && module.default.id) {
      exportedBook = module.default;
    } else {
      for (const val of Object.values(module)) {
        if (val && typeof val === 'object' && (val as any).id && (val as any).blinks) {
          exportedBook = val as Book;
          break;
        }
      }
      if (!exportedBook) {
        exportedBook = (module.default || Object.values(module)[0]) as Book;
      }
    }

    if (exportedBook && exportedBook.id) {
      const fullBook: Book = {
        ...exportedBook,
        isLoaded: true
      };

      // 4. Cache in IndexedDB for instant future offline reading
      try {
        await db.books.put(fullBook);
        if (fullBook.ideaCards && fullBook.ideaCards.length > 0) {
          for (const card of fullBook.ideaCards) {
            const existingIdea = await db.ideas.get(card.id);
            if (!existingIdea) {
              await db.ideas.put(card);
            } else if (existingIdea.isStashed) {
              await db.ideas.put({ ...card, isStashed: true, stashBoardIds: existingIdea.stashBoardIds });
            } else {
              await db.ideas.put(card);
            }
          }
        }
      } catch (dbErr) {
        console.warn(`[bookLoader] Failed to cache ${bookId} in IndexedDB:`, dbErr);
      }

      return fullBook;
    }
  } catch (loadErr) {
    console.error(`[bookLoader] Failed to dynamically load book '${bookId}':`, loadErr);
  }

  // Fallback to whatever stub is in IndexedDB
  return (await db.books.get(bookId)) || null;
}

