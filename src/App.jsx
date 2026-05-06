import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './presentation/layouts/MainLayout';
import Dashboard from './presentation/pages/Dashboard';
import Users from './presentation/pages/Users';
import Products from './presentation/pages/Products';
import Login from './presentation/pages/Auth/Login';
import Analytics from './presentation/pages/Analytics';
import Reports from './presentation/pages/Reports';
import Settings from './presentation/pages/Settings';
import Security from './presentation/pages/Security';
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
          { path: 'users', element: <Users /> },
          { path: 'products', element: <Products /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'reports', element: <Reports /> },
          { path: 'settings', element: <Settings /> },
          { path: 'security', element: <Security /> },
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
