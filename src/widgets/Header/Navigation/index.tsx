import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.desktopNav}>
      <Link to="/catalog" className={styles.navLink}>
        Каталог
      </Link>
      <Link to="/favorites" className={styles.navLink}>
        Избранное
      </Link>
      <Link to="/cart" className={styles.navLink}>
        Корзина
      </Link>
    </nav>
  );
}
