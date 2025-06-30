import React from 'react';
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiLogOut,
  FiBook,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../app/store';
import { logout } from '../../../features/auth/authSlice';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MobileMenu({ isOpen, toggleMenu }: MobileMenuProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleLogout = () => {
    dispatch(logout());
    toggleMenu();
  };

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.mobileSearch}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск книг..."
            className={styles.searchInput}
          />
        </div>

        <nav className={styles.mobileNav}>
          <Link
            to="/catalog"
            className={styles.mobileLink}
            onClick={toggleMenu}
          >
            <FiBook className={styles.linkIcon} />
            Каталог
          </Link>

          <Link
            to="/favorites"
            className={styles.mobileLink}
            onClick={toggleMenu}
          >
            <FiHeart className={styles.linkIcon} />
            Избранное
            {favorites.length > 0 && (
              <span className={styles.mobileBadge}>{favorites.length}</span>
            )}
          </Link>

          <Link to="/cart" className={styles.mobileLink} onClick={toggleMenu}>
            <FiShoppingCart className={styles.linkIcon} />
            Корзина
            {cart.length > 0 && (
              <span className={styles.mobileBadge}>{cart.length}</span>
            )}
          </Link>
        </nav>

        <div className={styles.mobileAuth}>
          {auth.isLoggedIn ? (
            <>
              <div className={styles.userInfo}>
                <FiUser className={styles.userIcon} />
                <span className={styles.userName}>{auth.userName}</span>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <FiLogOut className={styles.icon} />
                Выйти
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={styles.authButton}
              onClick={toggleMenu}
            >
              <FiUser className={styles.icon} />
              Войти
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
