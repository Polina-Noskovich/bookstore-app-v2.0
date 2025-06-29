import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import AuthSection from './AuthSection';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoWrapper} onClick={handleLogoClick}>
          <span className={styles.logo}>Bookstore</span>
        </div>

        <Navigation />
        <SearchBar />

        <div className={styles.actionsContainer}>
          <AuthSection />
          <MobileMenu
            isOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
    </header>
  );
}
