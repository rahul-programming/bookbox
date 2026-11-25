import { Book } from '../types';
import { db } from '../db';
import { BOOK_LOADER_MAP } from './bookCatalog';

// Dynamic Vite code-splitting imports for all expanded book files and performance volumes
const bookModules = import.meta.glob<{ [key: string]: any }>('./books/*Expanded.ts');
const performanceModules = import.meta.glob<{ [key: string]: any }>('./performance/*Performance.ts');

export function hasLoadedBookContent(book: Book): boolean {
  return Boolean(
    book.isLoaded &&
    ((book.blinks && book.blinks.length > 0) ||
      (book.performancePieces && book.performancePieces.length > 0))
  );
}

export async function loadFullBook(bookId: string): Promise<Book | null> {
  // 1. Check if the full book is already cached in IndexedDB with full content
  try {
    const existing = await db.books.get(bookId);
    if (existing && hasLoadedBookContent(existing)) {
      return existing;
    }
  } catch (err) {
    console.warn(`[bookLoader] Error reading ${bookId} from IndexedDB:`, err);
  }

  // 2. Resolve the dynamic import path from the catalog mapping
  const relPath = BOOK_LOADER_MAP[bookId];
  const loaderFn = relPath ? (bookModules[relPath] || performanceModules[relPath]) : undefined;
  if (!relPath || !loaderFn) {
    console.warn(`[bookLoader] No dynamic loader found for book '${bookId}' at path '${relPath}'`);
    return (await db.books.get(bookId)) || null;
  }

  // 3. Dynamically fetch the isolated book chunk on-demand
  try {
    const module = await loaderFn();
    let exportedBook: Book | null = null;
    if (module.default && module.default.id) {
      exportedBook = module.default;
    } else {
      for (const val of Object.values(module)) {
        if (val && typeof val === 'object' && (val as any).id && ((val as any).blinks || (val as any).performancePieces)) {
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

