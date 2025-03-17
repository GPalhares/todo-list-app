import React, { useState } from 'react';
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
    <div className="row justify-content-center">
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
            : `Não foram encontradas tarefas ${filterOptions
                .find((option) => option.value === filter)
                ?.label.toLowerCase()}!`}
        </p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="d-flex list-group-item align-items-center justify-content-between py-1 px-3 rounded mb-2"
              style={{
                border: '1px solid #D9D9D9',
                width: '100%',
                minHeight: '60px',
              }}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  style={{
                    width: '22px',
                    height: '22px',
                    cursor: 'pointer',
                  }}
                />

                <div className="d-flex flex-column ml-5 justify-content-start">
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      wordBreak: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      maxWidth: '100%',
                    }}
                  >
                    {task.description.length > 300
                      ? `${task.description.substring(0, 300)}...`
                      : task.description}
                  </div>

                  <div className="d-flex justify-content-start">
                    <div className="d-flex flex-wrap gap-2">
                      {task?.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-primary"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
