import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookQuery } from '../shared/api/bookApi';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../features/favorites/favoritesSlice';
import { addToCart } from '../features/cart/cartSlice';
import type { RootState } from '../app/store';
import styles from './ProductPage.module.css';

export default function ProductPage() {
  const { isbn } = useParams<{ isbn: string }>();
  const { data, isLoading, error } = useGetBookQuery(isbn || '');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (isLoading) return <div>Загрузка...</div>;
  if (error || !data) return <div>Книга не найдена</div>;

  const handleAddFav = () => {
    if (isLoggedIn) dispatch(addFavorite(data));
    else alert('Сначала войдите в аккаунт');
  };
  const handleAddCart = () => {
    if (isLoggedIn) dispatch(addToCart(data));
    else alert('Сначала войдите в аккаунт');
  };

  return (
    <div className={styles.container}>
      <img src={data.image} alt={data.title} className={styles.image} />
      <div className={styles.info}>
        <h2>{data.title}</h2>
        <p>
          <strong>Авторы:</strong> {data.authors}
        </p>
        <p>
          <strong>Год:</strong> {data.year}, <strong>Страниц:</strong>{' '}
          {data.pages}
        </p>
        <p>{data.desc}</p>
        <p>
          <strong>Цена:</strong> {data.price}
        </p>
        <button onClick={handleAddCart}>В корзину</button>
        <button onClick={handleAddFav}>В избранное</button>
      </div>
    </div>
  );
}
