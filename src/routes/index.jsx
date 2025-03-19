import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import LoadingScreen from '../components/loadingScreen';
import Login from '../pages/auth/login';
import GuestGuard from '../guards/guestGuard';
import AuthGuard from '../guards/authGuard';

const Register = lazy(() => import('../pages/auth/register'));
const Tasks = lazy(() => import('../pages/dashboard/tasks'));
const Users = lazy(() => import('../pages/dashboard/users'));
const NotFound = lazy(() => import('../pages/notfound'));
const TermsAndConditions = lazy(() => import('../pages/terms'));

const routes = [
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'tasks/:taskId?',
        element: (
          <AuthGuard>
            <Tasks />,
          </AuthGuard>
        ),
      },
      {
        path: 'users/:userId?',
        element: (
          <AuthGuard>
            <Users />,
          </AuthGuard>
        ),
      },
    ],
  },
  { path: 'terms', element: <TermsAndConditions /> },
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
