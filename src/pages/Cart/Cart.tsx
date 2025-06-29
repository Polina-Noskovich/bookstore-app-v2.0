import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import {
  removeFromCart,
  updateQuantity,
} from '../../features/cart/model/cartSlice';
import styles from './Cart.module.css';

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const total = cartItems.reduce(
    (sum: number, item: { book: { price: string }; quantity: number }) => {
      const price = parseFloat(item.book.price.replace('$', '')) || 0;
      return sum + price * item.quantity;
    },
    0,
  );

  return (
    <div className={styles.cart}>
      <h1>Корзина</h1>

      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <div className={styles.items}>
            {cartItems.map((item) => (
              <div key={item.book.isbn13} className={styles.item}>
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <h3>{item.book.title}</h3>
                  <p>{item.book.price}</p>
                </div>
                <div className={styles.quantity}>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.book.isbn13, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.book.isbn13, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.book.isbn13)}
                  className={styles.removeButton}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <h3>Итого: ${total.toFixed(2)}</h3>
            <button className={styles.checkoutButton}>Оформить заказ</button>
          </div>
        </>
      )}
    </div>
  );
};
