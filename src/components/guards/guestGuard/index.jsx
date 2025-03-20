import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export default function GuestGuard({ children }) {
  const token = localStorage.getItem('demariaToken');

  if (!token) return <div>{children}</div>;

  try {
    const decoded = jwtDecode(token);
    const userType = decoded.userType;

    if (userType === 1) return <Navigate to="/dashboard/tasks" replace />;
    if (userType === 2) return <Navigate to="/dashboard/users" replace />;
  } catch (error) {
    console.error('Token inválido:', error);
    return <div>{children}</div>;
  }

  return <div>{children}</div>;
}
