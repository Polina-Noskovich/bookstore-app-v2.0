import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import FavoritesPage from '../pages/FavoritesPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const isLoggedIn = false;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/catalog" element={<CatalogPage />} />
    <Route path="/book/:isbn" element={<ProductPage />} />
    <Route
      path="/favorites"
      element={
        <PrivateRoute>
          <FavoritesPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <PrivateRoute>
          <CartPage />
        </PrivateRoute>
      }
    />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
