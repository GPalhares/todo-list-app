import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import api from '../services/api';

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.userType === 2) {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar os usuários.');
    } finally {
      setLoading(false);
    }
  };

  const copyId = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => toast.success('ID copiado para a área de transferência!'))
      .catch((err) => console.error('Erro ao copiar ID:', err));
  };

  const deleteUser = async (id) => {
    const prevUsers = [...users];

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, deletedAt: new Date() } : user
      )
    );

    try {
      await api.patch(`/users/softdelete/${id}`);
      toast.success('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      toast.error('Erro ao deletar usuário.');
      setUsers(prevUsers);
    }
  };
  const restoreUser = async (id) => {
    const prevUsers = [...users];
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, deletedAt: null } : user
      )
    );

    try {
      await api.patch(`/users/restore/${id}`);
      toast.success('Usuário restaurado com sucesso!');
    } catch (error) {
      console.error('Erro ao restaurar usuário:', error);
      toast.error('Erro ao restaurar usuário.');
      setUsers(prevUsers);
    }
  };

  return (
    <UsersContext.Provider
      value={{ users, loading, fetchUsers, copyId, deleteUser, restoreUser }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
