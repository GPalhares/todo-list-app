import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.userType === 1) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks/user');
      setTasks(response.data);
      toast.success('Tarefas carregadas com sucesso!');
    } catch (error) {
      console.error('Erro ao carregar tarefas', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    const newTask = { id: Date.now(), ...taskData };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    try {
      const response = await api.post('/tasks', taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === newTask.id ? response.data : task))
      );
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa', error);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== newTask.id)
      );
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    try {
      await api.patch(`/tasks/${taskId}`, updatedTask);
      toast.success('Tarefa atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar tarefa', error);
      fetchTasks();
    }
  };

  const deleteTask = async (taskId) => {
    const prevTasks = tasks;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Tarefa deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar tarefa', error);
      setTasks(prevTasks);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, loading }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
