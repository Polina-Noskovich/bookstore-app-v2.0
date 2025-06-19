import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
        <Link to="/" style={{ color: '#fff' }}>
          bookstore
        </Link>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
      <footer style={{ background: '#333', color: '#fff', padding: '10px' }}>
        bookstore v2.0
      </footer>
    </div>
  );
};
