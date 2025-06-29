import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from '../shared/api/bookApi';
import authReducer from '../features/auth/authSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
