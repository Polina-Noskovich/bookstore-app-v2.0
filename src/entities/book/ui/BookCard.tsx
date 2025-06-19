import { Link } from 'react-router-dom';
import type { Book } from '../model/types';

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
      <img src={book.image} alt={book.title} width="100%" />
      <h3>{book.title}</h3>
      <p>Цена: {book.price}</p>
      <Link to={`/book/${book.isbn13}`}>Подробнее</Link>
    </div>
  );
};
