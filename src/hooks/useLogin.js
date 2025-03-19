import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const token = response.data.access_token;
      localStorage.setItem('demaria_token', token);

      const decoded = jwtDecode(token);
      const userType = decoded.user_type;

      if (userType === 1) {
        navigate('/dashboard/tasks');
      }

      if (userType === 2) {
        navigate('/dashboard/users');
      }
    } catch (error) {
      console.error(
        'Erro no login:',
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
