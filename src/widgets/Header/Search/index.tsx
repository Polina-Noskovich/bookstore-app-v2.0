import React, { useState, useRef, useEffect } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useSearchBooksQuery } from '../../../shared/api/bookApi';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import SearchResults from './SearchResults';
import styles from './Search.module.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useSearchBooksQuery(
    { query: debouncedQuery, page: 1 },
    { skip: debouncedQuery.length < 2 },
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}&page=1`);
      setIsActive(false);
      setQuery('');
    }
  };

  const handleBookSelect = (isbn: string) => {
    navigate(`/products/${isbn}`);
    setIsActive(false);
    setQuery('');
  };

  const handleSeeAll = () => {
    navigate(`/catalog?search=${encodeURIComponent(debouncedQuery)}&page=1`);
    setIsActive(false);
    setQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <button
          type="button"
          className={styles.searchIcon}
          onClick={() => setIsActive(true)}
        >
          <FiSearch />
        </button>

        <input
          type="text"
          placeholder="Search in library..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          className={styles.searchInput}
        />
      </form>

      {isActive && debouncedQuery.length >= 2 && (
        <SearchResults
          books={data?.books || []}
          isLoading={isLoading || isFetching}
          onBookSelect={handleBookSelect}
          onSeeAll={handleSeeAll}
          searchQuery={debouncedQuery}
        />
      )}
    </div>
  );
}
