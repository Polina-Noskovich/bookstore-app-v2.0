import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import BookCard from '../widgets/BookCard';
import styles from './CartPage.module.css';

export default function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <div>Корзина пуста</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Корзина</h1>
      <button onClick={() => dispatch(clearCart())}>Очистить корзину</button>
      <div className={styles.list}>
        {items.map((book) => (
          <div key={book.isbn13} className={styles.item}>
            <BookCard book={book} />
            <button onClick={() => dispatch(removeFromCart(book.isbn13))}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
