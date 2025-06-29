import React from 'react';
import { FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../app/store';
import { logout } from '../../../features/auth/authSlice';
import styles from './AuthSection.module.css';

export default function AuthSection() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.authContainer}>
      <Link
        to="/favorites"
        className={styles.iconButton}
        aria-label="Избранное"
      >
        <FiHeart />
      </Link>

      <Link to="/cart" className={styles.iconButton} aria-label="Корзина">
        <FiShoppingCart />
      </Link>

      {auth.isLoggedIn ? (
        <div className={styles.userDropdown}>
          <button
            className={styles.iconButton}
            aria-label="Профиль пользователя"
          >
            <FiUser />
          </button>
          <div className={styles.dropdownContent}>
            <span className={styles.userName}>Привет, {auth.userName}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Выйти
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.authLinks}>
          <Link to="/login" className={styles.authLink}>
            Войти
          </Link>
          <Link to="/register" className={styles.authLink}>
            Регистрация
          </Link>
        </div>
      )}
    </div>
  );
}
