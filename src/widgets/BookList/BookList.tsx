import type { Book } from '../../entities/book/model/types';
import { BookCard } from '../../entities/book/ui/BookCard';

export const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {books.map((book) => (
        <BookCard key={book.isbn13} book={book} />
      ))}
    </div>
  );
};
