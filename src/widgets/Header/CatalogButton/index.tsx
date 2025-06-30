import React from 'react';
import { FiBook } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './CatalogButton.module.css';

export default function CatalogButton() {
  return (
    <Link to="/catalog" className={styles.catalogButton}>
      <span className={styles.text}>Catalogue</span>
    </Link>
  );
}
