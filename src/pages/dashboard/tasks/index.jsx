import React, { useState } from 'react';
import TaskList from './components/list';
import CreateTask from './components/modal/create';
import EditTask from './components/modal/edit';
import { useLogout } from '../../../hooks/useLogout';
import { useTasks } from '../../../contexts/TaskContext';
import ProfileButton from '../../../components/profileButton';

export default function Tasks() {
  const [open, setOpen] = useState(null);

  const { tasks, createTask, updateTask } = useTasks();

  const modals = {
    newTask: (
      <CreateTask setOpen={setOpen} tasks={tasks} createTask={createTask} />
    ),
    editTask: (
      <EditTask setOpen={setOpen} tasks={tasks} updateTask={updateTask} />
    ),
  };

  return (
    <div className="main-container">
      <div className="d-flex card card-with-shadow-border">
        <div className="d-flex mb-4  w-100 align-items-center justify-content-between">
          <h2 className="fw-bold mb-0">Tarefas</h2>
          <ProfileButton />
        </div>

        <div className="d-flex w-100 justify-content-end">
          <button
            onClick={() => setOpen('newTask')}
            className="btn btn-primary d-flex align-items-center mb-3"
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

        <TaskList setOpen={setOpen} />

        {open && modals[open]}
      </div>
    </div>
  );
}
