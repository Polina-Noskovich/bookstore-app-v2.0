import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../../entities/book/api/bookApi';
import { BookDetails } from '../../entities/book/ui/BookDetails.tsx';
import styles from './BookPage.module.css';

export const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading } = useGetBookByIdQuery(id || '');

  if (isLoading) return <div>Загрузка книги...</div>;
  if (!book) return <div>Книга не найдена</div>;

  return (
    <div className={styles.bookPage}>
      <BookDetails book={book} />
    </div>
  );
};
