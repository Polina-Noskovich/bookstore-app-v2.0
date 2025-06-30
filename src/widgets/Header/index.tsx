import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import Logo from './Logo';
import Search from './Search';
import CatalogButton from './CatalogButton';
import UserActions from './UserActions';
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
        <Logo onClick={handleLogoClick} />
        <Search />

        <CatalogButton />

        <UserActions />
        <MobileMenu
          isOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
    </header>
  );
}
