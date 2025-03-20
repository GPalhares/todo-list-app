import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const login = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const token = response.data.access_token;
      localStorage.setItem('demaria_token', token);

      const decoded = jwtDecode(token);

      const { user_type, ...userData } = decoded;

      setUser(userData);

      toast.success('Login realizado com sucesso!');

      if (user_type === 1) {
        navigate('/dashboard/tasks');
      }

      if (user_type === 2) {
        navigate('/dashboard/users');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Erro ao fazer login, tente novamente!'
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
