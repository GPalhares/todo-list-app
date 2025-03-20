import React from 'react';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TasksProvider } from './contexts/TaskContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <AuthProvider>
        <TasksProvider>
          <AppRoutes />
        </TasksProvider>
      </AuthProvider>
    </>
  );
}
