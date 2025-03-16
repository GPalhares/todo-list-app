import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

export default function EditTask({ setOpen, tasks, setTasks }) {
  const [taskToEdit, setTaskToEdit] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const taskId = useSearchParams.get('taskId');

  useEffect(() => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskToEdit(task);
  }, [taskId, tasks]);

  const onSubmit = (data) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskToEdit.id ? { ...task, task: data.task } : task
    );
    setTasks(updatedTasks);
    setOpen(null);
    reset();
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg rounded-3">
          <div className="modal-header border-0">
            <h5 className="modal-title">Editar Tarefa</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpen(null)}
              aria-label="Fechar"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  defaultValue={taskToEdit.label}
                  type="text"
                  className="form-control border-2 rounded-3 p-3"
                  placeholder="Digite sua tarefa..."
                  {...register('task', { required: 'A tarefa é obrigatória' })}
                />
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                className="btn btn-secondary"
                onClick={() => setOpen(null)}
                type="button"
              >
                Fechar
              </button>

              <button
                className="btn btn-primary d-flex align-items-center"
                type="submit"
              >
                <img
                  src="/assets/icons/check.svg"
                  alt="Editar"
                  width="22"
                  height="22"
                />
                <span className="ms-1">Salvar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
