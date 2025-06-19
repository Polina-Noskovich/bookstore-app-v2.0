import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { BookPage } from '../pages/Book/BookPage';
import { Layout } from '../widgets/Layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'book/:id', element: <BookPage /> },
    ],
  },
]);
