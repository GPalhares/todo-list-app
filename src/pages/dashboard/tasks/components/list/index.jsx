import React, { useState } from 'react';
import { format, isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function TaskList({
  tasks,
  toggleComplete,
  deleteTask,
  setOpen,
}) {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'inProgress') return !task.completed;
    return true;
  });

  const filterOptions = [
    { label: 'Todas', value: 'all' },
    { label: 'Concluídas', value: 'completed' },
    { label: 'Em andamento', value: 'inProgress' },
  ];

  const editTask = (taskId) => {
    setOpen('editTask');
    navigate(`${taskId}`);
  };

  return (
    <div className="px-4 px-sm-5 row justify-content-center">
      <div className="d-flex mb-3 justify-content-left">
        {filterOptions.map((option) => (
          <button
            className={`btn btn-outline-secondary me-2 ${
              filter === option.value ? 'active' : ''
            }`}
            key={option.value}
            style={{
              borderRadius: '16px',
              padding: '3px 7px',
              fontSize: '12px',
            }}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="my-2 text-muted">
          {tasks.length === 0
            ? 'Crie sua primeira tarefa para começar!'
            : 'Não foram encontradas tarefas com esse filtro!'}
        </p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex align-items-center justify-content-between py-1 px-5 rounded mb-2"
              style={{
                backgroundColor: '#f1f1f1',
                width: '100%',
              }}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
              </div>

              <div>
                <div className="d-flex justify-content-left">
                  {task.description}
                </div>
                <small className="text-muted">
                  {isToday(new Date(task.createdAt))
                    ? `Hoje às: ${format(new Date(task.createdAt), 'HH:mm')}`
                    : `Criada em: ${format(
                        new Date(task.createdAt),
                        'dd/MM/yyyy HH:mm'
                      )}`}
                </small>
              </div>

              <div>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    marginRight: '8px',
                  }}
                  onClick={() => editTask(task.id)}
                >
                  <img
                    src="/assets/icons/pencil.svg"
                    alt="Editar"
                    width="16"
                    height="16"
                  />
                </button>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                  onClick={() => deleteTask(task.id)}
                >
                  <img
                    src="/assets/icons/trash.svg"
                    alt="Excluir"
                    width="16"
                    height="16"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
