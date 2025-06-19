import { useSearchBooksQuery } from '../../entities/book/api/bookApi';
import { BookList } from '../../widgets/BookList/BookList';

export const Home = () => {
  const { data: books, isLoading } = useSearchBooksQuery({ query: 'react' });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome</h1>
      <BookList books={books?.books || []} />
    </div>
  );
};
