import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const register = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', data);
      const token = response.data.access_token;

      localStorage.setItem('demaria_token', token);

      const decoded = jwtDecode(token);

      const { user_type, ...userData } = decoded;

      setUser(userData);

      toast.success('Cadastro realizado com sucesso!');

      if (user_type === 1) {
        navigate('/dashboard/tasks');
      } else if (user_type === 2) {
        navigate('/dashboard/users');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error(
        error.response?.data?.message ||
          'Erro ao fazer cadastro, tente novamente!'
      );
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}
