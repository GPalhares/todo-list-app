import React from 'react';
import { useForm } from 'react-hook-form';

export default function CreateTask({ setOpen, tasks, setTasks }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newTask = {
      id: tasks.length + 1,
      description: data.description,
      createdAt: new Date(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setOpen(null);
    reset();
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg rounded-3">
          <div className="modal-header border-0">
            <h5 className="modal-title">Nova Tarefa</h5>
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
                  type="text"
                  className="form-control border-2 rounded-3 p-3"
                  placeholder="Digite sua tarefa..."
                  {...register('description', {
                    required: 'A tarefa é obrigatória',
                  })}
                />
                {errors.description && (
                  <p className="text-error">{errors.description.message}</p>
                )}
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
                  src="/assets/icons/plus.svg"
                  alt="Criar"
                  width="22"
                  height="22"
                />
                <span className="ms-1">Criar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
