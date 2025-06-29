import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
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
        <nav className={styles.mobileNav}>
          <Link
            to="/catalog"
            className={styles.mobileLink}
            onClick={toggleMenu}
          >
            Каталог
          </Link>
          <Link
            to="/favorites"
            className={styles.mobileLink}
            onClick={toggleMenu}
          >
            Избранное
          </Link>
          <Link to="/cart" className={styles.mobileLink} onClick={toggleMenu}>
            Корзина
          </Link>
        </nav>

        <div className={styles.mobileAuth}>
          {auth.isLoggedIn ? (
            <button onClick={handleLogout} className={styles.mobileLogout}>
              Выйти
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={styles.mobileAuthLink}
                onClick={toggleMenu}
              >
                Войти
              </Link>
              <Link
                to="/register"
                className={styles.mobileAuthLink}
                onClick={toggleMenu}
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
