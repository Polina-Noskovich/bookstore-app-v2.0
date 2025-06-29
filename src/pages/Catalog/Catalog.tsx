import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Catalog.module.css';
import { useSearchBooksQuery } from '../../entities/book/api/bookApi';
import { BookList } from '../../widgets/BookList/BookList';
import { Pagination } from '../../widgets/Pagination/Pagination';
import { ErrorMessage } from '../../shared/ui/ErrorMessage';

export const Catalog = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('react');
  const navigate = useNavigate();

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useSearchBooksQuery({
    query: searchQuery,
    page,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleBookClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className={styles.catalog}>
      <h1>Каталог книг</h1>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск книг..."
        />
        <button type="submit">Найти</button>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BookList books={books?.books || []} onBookClick={handleBookClick} />
          <Pagination
            currentPage={page}
            totalPages={books ? Math.ceil(parseInt(books.total) / 10) : 1}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
