import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import GuestGuard from '../components/guards/guestGuard';
import AuthGuard from '../components/guards/authGuard';
import LoadingCircular from '../components/loadingCircular';

const Tasks = lazy(() => import('../pages/dashboard/tasks'));
const Profile = lazy(() => import('../pages/dashboard/profile'));
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
        path: 'users',
        element: (
          <AuthGuard>
            <Users />,
          </AuthGuard>
        ),
      },
      {
        path: 'profile',
        element: (
          <AuthGuard>
            <Profile />,
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
      <Suspense
        fallback={
          <div className="main-container">
            <LoadingCircular />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
