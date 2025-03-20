import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem('demariaToken');

    setUser(null);

    navigate('/auth/login');
  };

  return { logout };
}
