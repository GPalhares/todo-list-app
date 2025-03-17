import React, { useState } from 'react';
import TaskList from './components/list';
import CreateTask from './components/modal/create';
import EditTask from './components/modal/edit';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Lavar a louça',
      createdAt: '2025-03-16T23:02:07.516Z',
      completed: false,
    },
    {
      id: 2,
      description: 'Aprender Nest.js',
      createdAt: '2025-03-16T23:03:07.516Z',
      completed: true,
    },
    {
      id: 3,
      description: 'Limpar a casa',
      createdAt: '2025-01-16T23:02:07.516Z',
      completed: false,
    },
  ]);
  const [open, setOpen] = useState(null);

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const modals = {
    newTask: <CreateTask setOpen={setOpen} tasks={tasks} setTasks={setTasks} />,
    editTask: <EditTask setOpen={setOpen} tasks={tasks} setTasks={setTasks} />,
  };

  return (
    <div className="d-flex card justify-content-center px-4 px-sm-5 py-5 align-items-center card-with-shadow-border">
      <div
        style={{ width: '100%' }}
        className="d-flex mb-5 align-items-center justify-content-between"
      >
        <h2 className="fw-bold">Tarefas</h2>

        <button
          onClick={() => setOpen('newTask')}
          className="btn btn-primary d-flex align-items-center"
        >
          <img
            src="/assets/icons/plus.svg"
            alt="Criar"
            width="22"
            height="22"
          />
          <span className="ms-1">Criar Tarefa</span>
        </button>
      </div>

      <TaskList
        tasks={tasks}
        setOpen={setOpen}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />

      {open && modals[open]}
    </div>
  );
}
