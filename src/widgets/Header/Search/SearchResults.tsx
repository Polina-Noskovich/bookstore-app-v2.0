import React from 'react';
import type { Book } from '../../../shared/api/bookApi';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  books: Book[];
  isLoading: boolean;
  onBookSelect: (isbn: string) => void;
  onSeeAll: () => void;
  searchQuery: string;
}

export default function SearchResults({
  books,
  isLoading,
  onBookSelect,
  onSeeAll,
  searchQuery,
}: SearchResultsProps) {
  const displayedBooks = books.slice(0, 4);

  if (isLoading) {
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      {displayedBooks.length > 0 ? (
        <>
          <ul className={styles.resultsList}>
            {displayedBooks.map((book) => (
              <li key={book.isbn13} className={styles.resultItem}>
                <button
                  onClick={() => onBookSelect(book.isbn13)}
                  className={styles.resultButton}
                >
                  <div className={styles.bookInfo}>
                    <div className={styles.bookTitle}>{book.title}</div>
                    <div className={styles.bookPrice}>{book.price}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {(books.length > 4 || books.length === 0) && (
            <button onClick={onSeeAll} className={styles.seeAllButton}>
              {books.length > 0
                ? `All results by "${searchQuery}" (${books.length})`
                : `Nothing was found by "${searchQuery}"`}
            </button>
          )}
        </>
      ) : (
        <div className={styles.noResults}>
          Nothing was found for the query "{searchQuery}"
        </div>
      )}
    </div>
  );
}
