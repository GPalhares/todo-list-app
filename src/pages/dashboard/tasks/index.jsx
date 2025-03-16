import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import TaskList from './components/list';
import CreateTask from './components/modal/create';
import EditTask from './components/modal/edit';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'asdasdas',
      createdAt: '2025-03-16T23:02:07.516Z',
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
    <div className="d-flex justify-content-center card m-0 py-5 align-items-center card-with-shadow">
      <div
        style={{ width: '100%' }}
        className="d-flex mb-5 align-items-center justify-content-around"
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
