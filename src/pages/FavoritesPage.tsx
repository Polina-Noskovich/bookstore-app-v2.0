import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { removeFavorite } from '../features/favorites/favoritesSlice';
import BookCard from '../widgets/BookCard';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const items = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <div>Список избранного пуст</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Избранное</h1>
      <div className={styles.list}>
        {items.map((book) => (
          <div key={book.isbn13} className={styles.item}>
            <BookCard book={book} />
            <button onClick={() => dispatch(removeFavorite(book.isbn13))}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
