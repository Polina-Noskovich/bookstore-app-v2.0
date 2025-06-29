import React from 'react';
import { useGetNewBooksQuery } from '../shared/api/bookApi';
import BookCard from '../widgets/BookCard';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { data, error, isLoading } = useGetNewBooksQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (error || !data) {
    return <div>Ошибка при загрузке новинок</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Новые книги</h1>
      <div className={styles.list}>
        {data.books.map((book) => (
          <BookCard key={book.isbn13} book={book} />
        ))}
      </div>
    </div>
  );
}
