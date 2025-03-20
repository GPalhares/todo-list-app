import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('demariaToken');

  useEffect(() => {
    if (token) {
      authenticateUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await api.get(`/users/me`);

      setUser(response.data);
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      setError('Erro ao carregar as informações do usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
