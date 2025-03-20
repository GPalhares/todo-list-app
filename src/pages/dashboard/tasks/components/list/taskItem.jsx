import React from 'react';
import { useTasks } from '../../../../../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';

export default function TaskItem({ task, setOpen }) {
  const { tasks, deleteTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const toggleComplete = (id) => {
    updateTask(id, {
      completed: !tasks.find((task) => task.id === id).completed,
    });
  };

  const handleEdit = () => {
    setOpen('editTask');
    navigate(`${task.id}`);
  };

  return (
    <li
      className="d-flex list-group-item align-items-center justify-content-between py-1 px-3 rounded mb-2"
      style={{ border: '1px solid #D9D9D9', width: '100%', minHeight: '60px' }}
    >
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input me-3"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          style={{ width: '22px', height: '22px', cursor: 'pointer' }}
        />

        <div className="d-flex flex-column ml-5 justify-content-start">
          <div
            className="d-flex justify-content-start"
            style={{ wordBreak: 'break-word' }}
          >
            {task.description.length > 300
              ? `${task.description.substring(0, 300)}...`
              : task.description}
          </div>

          <div className="d-flex justify-content-start">
            <div className="d-flex flex-nowrap gap-2">
              {task?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-primary"
                  style={{ fontSize: '0.70rem' }}
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
          onClick={handleEdit}
        >
          <img
            src="/assets/icons/pencil.svg"
            alt="Editar"
            width="16"
            height="16"
          />
        </button>

        <button
          style={{ backgroundColor: 'transparent', border: 'none' }}
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
  );
}
