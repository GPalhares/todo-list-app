import React, { useState } from 'react';
import TaskList from './components/list';
import CreateTask from './components/modal/create';
import EditTask from './components/modal/edit';
import { useLogout } from '../../../hooks/useLogout';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(null);

  const { logout } = useLogout();

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
    <div>
      <div className="d-flex card justify-content-center px-4 px-sm-5 py-5 align-items-center card-with-shadow-border">
        <div
          style={{ width: '100%' }}
          className="d-flex mb-4 align-items-center justify-content-between"
        >
          <h2 className="fw-bold m-0">Tarefas</h2>

          <button
            onClick={() => setOpen('newTask')}
            className="btn btn-primary"
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

      <div className="d-flex justify-content-end mx-sm-0 mx-4">
        <button className="btn btn-outline-danger mt-5" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
