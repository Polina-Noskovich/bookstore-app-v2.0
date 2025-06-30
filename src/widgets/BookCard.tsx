import type { Book } from '../shared/api/bookApi';
import { Link } from 'react-router-dom';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className={styles.card}>
      <Link to={`/products/${book.isbn13}`}>
        <img src={book.image} alt={book.title} className={styles.image} />
      </Link>
      <div className={styles.info}>
        <Link to={`/products/${book.isbn13}`} className={styles.title}>
          {book.title}
        </Link>
        <div className={styles.price}>{book.price}</div>
      </div>
    </div>
  );
}
