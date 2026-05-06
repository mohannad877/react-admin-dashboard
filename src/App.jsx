import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './presentation/layouts/MainLayout';
import Dashboard from './presentation/pages/Dashboard';
import UsersPage from './presentation/pages/Users';
import ProductsPage from './presentation/pages/Products';
import Login from './presentation/pages/Auth/Login';
import ProtectedRoute from './presentation/components/shared/ProtectedRoute';
import NotFound from './presentation/pages/NotFound';

const router = createBrowserRouter([
  // ─── مسار تسجيل الدخول (عام) ─────────────────────────────────────────
  {
    path: '/login',
    element: <Login />,
  },

  // ─── مسارات لوحة التحكم (محمية بتسجيل الدخول) ───────────────────────
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'products', element: <ProductsPage /> },
        ],
      },
    ],
  },

  // ─── 404 ─────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
