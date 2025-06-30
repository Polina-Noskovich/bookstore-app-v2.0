import React from 'react';
import {
  useSearchBooksQuery,
  useGetNewBooksQuery,
} from '../shared/api/bookApi';
import BookCard from '../widgets/BookCard';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('search') || '';
  const page = Number(params.get('page') || 1);

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useSearchBooksQuery({ query, page }, { skip: !query });

  const {
    data: newBooksData,
    error: newBooksError,
    isLoading: isNewBooksLoading,
  } = useGetNewBooksQuery(undefined, { skip: !!query });

  const data = query ? searchData : newBooksData;
  const error = query ? searchError : newBooksError;
  const isLoading = query ? isSearchLoading : isNewBooksLoading;

  const totalPages = data && query ? Math.ceil(parseInt(data.total) / 10) : 1;

  const changePage = (newPage: number) => {
    navigate(`/catalog?search=${encodeURIComponent(query)}&page=${newPage}`);
  };

  if (isLoading) return <div className={styles.loading}>Загрузка книг...</div>;
  if (error)
    return <div className={styles.error}>Ошибка при загрузке данных</div>;
  if (!data || !data.books.length)
    return <div className={styles.noResults}>Книги не найдены</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {query ? `Результаты поиска: «${query}»` : 'Каталог книг'}
      </h1>

      <div className={styles.list}>
        {data.books.map((book) => (
          <BookCard key={book.isbn13} book={book} />
        ))}
      </div>

      {query && data.books.length > 0 && (
        <div className={styles.pagination}>
          {page > 1 && (
            <button
              className={styles.paginationButton}
              onClick={() => changePage(page - 1)}
            >
              Назад
            </button>
          )}

          <span className={styles.pageInfo}>
            Страница {page} из {totalPages}
          </span>

          {page < totalPages && (
            <button
              className={styles.paginationButton}
              onClick={() => changePage(page + 1)}
            >
              Вперед
            </button>
          )}
        </div>
      )}
    </div>
  );
}
