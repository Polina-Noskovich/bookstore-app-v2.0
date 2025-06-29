import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}&page=1`);
      setIsActive(false);
    }
  };

  const toggleSearch = () => {
    setIsActive(!isActive);
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
    <div
      ref={searchRef}
      className={`${styles.searchWrapper} ${isActive ? styles.active : ''}`}
    >
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Поиск книг..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FiSearch />
        </button>
      </form>

      <button
        className={`${styles.searchToggle} ${isActive ? styles.active : ''}`}
        onClick={toggleSearch}
        aria-label={isActive ? 'Закрыть поиск' : 'Открыть поиск'}
      >
        <FiSearch />
      </button>
    </div>
  );
}
