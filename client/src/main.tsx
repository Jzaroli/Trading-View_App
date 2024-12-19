import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './pages/Board.tsx'

// import './index.css';

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
// import Favorites from './pages/Favorites.tsx';
import Login from './pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashBoard />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/favorites',
        // element: <Favorites />
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
