import { useGetBookByIdQuery } from '../../entities/book/api/bookApi';
import { useParams } from 'react-router-dom';

export const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading } = useGetBookByIdQuery(id || '');

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>Книга не найдена</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.image} alt={book.title} />
      <p> {book.authors}</p>
      <p> {book.price}</p>
      <p> {book.subtitle}</p>
      <a href={book.url} target="_blank" rel="noopener noreferrer">
        Купить пока так
      </a>
    </div>
  );
};
