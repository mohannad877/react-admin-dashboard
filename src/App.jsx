import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/Users';
import ProductsPage from './pages/Products';

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
  return <RouterProvider router={router} />;
}
