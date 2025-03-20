import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     fetchTasks();
  //   }
  // }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    console.log('Buscando tarefas...');

    try {
      const response = await api.get('/tasks/user');
      console.log('Tarefas recebidas:', response.data);
      setTasks(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await api.post('/tasks', taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Erro ao criar tarefa', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, createTask, loading }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
