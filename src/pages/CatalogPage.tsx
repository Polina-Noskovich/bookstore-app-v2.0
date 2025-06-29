import React from 'react';
import { useSearchBooksQuery } from '../shared/api/bookApi';
import BookCard from '../widgets/BookCard';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('search') || '';
  const page = Number(params.get('page') || '1');

  const { data, error, isLoading } = useSearchBooksQuery({ query, page });

  const totalPages = data ? Math.ceil(parseInt(data.total) / 10) : 1;

  const changePage = (newPage: number) => {
    navigate(`/catalog?search=${encodeURIComponent(query)}&page=${newPage}`);
  };

  if (!query) {
    return <div>Введите запрос для поиска книг.</div>;
  }
  if (isLoading) return <div>Загрузка...</div>;
  if (error || !data) return <div>Ошибка при поиске</div>;

  return (
    <div className={styles.container}>
      <h1>Результаты поиска: «{query}»</h1>
      <div className={styles.list}>
        {data.books.map((book) => (
          <BookCard key={book.isbn13} book={book} />
        ))}
      </div>
      <div className={styles.pagination}>
        {page > 1 && (
          <button onClick={() => changePage(page - 1)}>Пред.</button>
        )}
        <span>
          Стр. {page} из {totalPages}
        </span>
        {page < totalPages && (
          <button onClick={() => changePage(page + 1)}>След.</button>
        )}
      </div>
    </div>
  );
}
