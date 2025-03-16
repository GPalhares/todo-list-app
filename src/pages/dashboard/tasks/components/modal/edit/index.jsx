import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'; // Importe o useNavigate

export default function EditTask({ setOpen, tasks, setTasks }) {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate(); // Instancia o useNavigate

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const task = tasks.find((task) => task.id == taskId);
    setTaskToEdit(task);
  }, [taskId, tasks]);

  const handleClose = () => {
    setOpen(null);
    navigate(-1, { replace: true });
  };

  const onSubmit = (data) => {
    const updatedTasks = tasks.map((task) =>
      task.id == taskToEdit.id
        ? { ...task, description: data.description }
        : task
    );
    setTasks(updatedTasks);
    setOpen(null);
    reset();
    navigate(-1, { replace: true });
  };

  return (
    taskToEdit && (
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg rounded-3">
            <div className="modal-header border-0">
              <h5 className="modal-title">Editar Tarefa</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Fechar"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    defaultValue={taskToEdit.description}
                    type="text"
                    className="form-control border-2 rounded-3 p-3"
                    placeholder="Digite sua tarefa..."
                    {...register('description', {
                      required: 'A tarefa é obrigatória',
                    })}
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-secondary"
                  onClick={handleClose}
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
                    width="14"
                    height="14"
                  />
                  <span className="ms-1">Salvar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
