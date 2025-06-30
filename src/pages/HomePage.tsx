import { useGetNewBooksQuery } from '../shared/api/bookApi';
import BookCard from '../widgets/BookCard';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { data, error, isLoading } = useGetNewBooksQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>IT Programming Computer Science Books</h1>
      </div>
      <div className={styles.headerNews}>
        <h1 className={styles.titleNews}>New release</h1>
      </div>

      <div className={styles.list}>
        {data.books.map((book) => (
          <BookCard key={book.isbn13} book={book} />
        ))}
      </div>
    </div>
  );
}
