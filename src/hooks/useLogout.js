import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('demaria_token');
    navigate('/auth/login');
  };

  return { logout };
}
