import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', data);
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
        'Erro no registro:',
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}
