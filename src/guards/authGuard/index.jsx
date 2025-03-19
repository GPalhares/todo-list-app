import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }) {
  const token = localStorage.getItem('demaria_token');

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <div>{children}</div>;
}
