import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './presentation/layouts/MainLayout';
import Dashboard from './presentation/pages/Dashboard';
import UsersPage from './presentation/pages/Users';
import ProductsPage from './presentation/pages/Products';
import { useAnalytics } from './application/hooks/useAnalytics';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <UsersPage /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
]);

export default function App() {
  useAnalytics(import.meta.env.VITE_GA_ID);
  return <RouterProvider router={router} />;
}
