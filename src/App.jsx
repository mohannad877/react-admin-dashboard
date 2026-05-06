import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './presentation/layouts/MainLayout';
import Dashboard from './presentation/pages/Dashboard';
import Users from './presentation/pages/Users';
import Products from './presentation/pages/Products';
import Login from './presentation/pages/Auth/Login';
import ComingSoon from './presentation/pages/ComingSoon';
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
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'products', element: <Products /> },
      { path: 'analytics', element: <ComingSoon /> },
      { path: 'reports', element: <ComingSoon /> },
      { path: 'settings', element: <ComingSoon /> },
      { path: 'security', element: <ComingSoon /> },
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
