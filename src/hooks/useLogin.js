import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

export function useLogin() {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);

    try {
      const response = await api.post('/auth/login', data);
      const token = response.data.accessToken;
      localStorage.setItem('demariaToken', token);

      const decoded = jwtDecode(token);

      const userData = { ...decoded };

      setUser(userData);

      toast.success('Login realizado com sucesso!');

      if (userData.userType === 1) {
        navigate('/dashboard/tasks');
      }

      if (userData.userType === 2) {
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
