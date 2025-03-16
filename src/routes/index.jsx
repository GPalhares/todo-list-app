import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/loadingScreen';

const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));
const Tasks = lazy(() => import('../pages/dashboard/tasks'));
const Backoffice = lazy(() => import('../pages/dashboard/backoffice'));
const NotFound = lazy(() => import('../pages/notfound'));

const routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: 'dashboard',
    children: [
      { path: 'tasks/:taskId?', element: <Tasks /> },
      { path: 'backoffice/:userId?', element: <Backoffice /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

const AppRoutes = () => {
  const routing = useRoutes(routes);
  return routing;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
