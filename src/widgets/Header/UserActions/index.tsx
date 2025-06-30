import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiBook,
  FiBookmark,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../app/store';
import { logout } from '../../../features/auth/authSlice';
import styles from './UserActions.module.css';

export default function UserActions() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.actionsContainer}>
      <div className={styles.mobileCatalog}>
        <Link to="/catalog" className={styles.catalogIcon}>
          <FiBook />
        </Link>
      </div>

      {auth.isLoggedIn ? (
        <>
          <div className={styles.userInfo}>
            <FiUser className={styles.icon} />
            <span className={styles.userName}>{auth.userName}</span>
          </div>
          <Link to="/favorites" className={styles.actionItem}>
            <FiBookmark className={styles.icon} />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>

          <Link to="/cart" className={styles.actionItem}>
            <FiShoppingCart className={styles.icon} />
            {cart.length > 0 && (
              <span className={styles.badge}>{cart.length}</span>
            )}
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FiLogOut className={styles.icon} />
          </button>
        </>
      ) : (
        <Link to="/login" className={styles.loginButton}>
          <FiUser className={styles.icon} />
          <span>Log in</span>
        </Link>
      )}
    </div>
  );
}
