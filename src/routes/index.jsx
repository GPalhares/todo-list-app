import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/loadingScreen';

// Páginas
const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const NotFound = lazy(() => import('../pages/notfound'));

const routes = [
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Dashboard />
      </Suspense>
    ),
  },
  { path: '*', element: <NotFound /> },
];

const AppRoutes = () => {
  const routing = useRoutes(routes);
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>{routing}</Suspense>
    </Router>
  );
};

export default AppRoutes;
