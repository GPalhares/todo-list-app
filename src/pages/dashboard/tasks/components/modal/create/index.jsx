import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateTags } from '../../../../../../services/chatgpt';

export default function CreateTask({ setOpen, tasks, setTasks }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const [tags, setTags] = useState([]);
  const [showGenerateButton, setShowGenerateButton] = useState(false);

  const onSubmit = (data) => {
    const newTask = {
      id: tasks.length + 1,
      description: data.description,
      createdAt: new Date(),
      completed: false,
      tags: tags,
    };
    setTasks([...tasks, newTask]);
    setOpen(null);
    reset();
    setTags([]);
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setShowGenerateButton(description.length >= 5);
  };

  const handleGenerateTags = async () => {
    const description = watch('description');

    const generatedTags = await generateTags(description, tags);

    setTags(generatedTags);
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
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control border-2 rounded-3 p-3"
                  placeholder="Digite sua tarefa..."
                  maxLength="40"
                  {...register('description', {
                    required: 'A tarefa é obrigatória',
                  })}
                  onChange={handleDescriptionChange}
                />

                {errors.description && (
                  <p className="text-error">{errors.description.message}</p>
                )}
              </div>

              {showGenerateButton && (
                <button
                  style={{ color: '#0d6efd' }}
                  type="button"
                  className="btn btn-text-primary"
                  onClick={handleGenerateTags}
                >
                  <img
                    src="/assets/icons/magic-wand.svg"
                    alt="Criar"
                    width="16"
                    height="16"
                  />
                  {tags.length > 0 ? (
                    <span className="ms-2">Gerar Novas tags com IA</span>
                  ) : (
                    <span className="ms-2">Gerar Tags com IA</span>
                  )}
                </button>
              )}

              {tags.length > 0 && (
                <div className="mt-4">
                  <strong>Tags sugeridas:</strong>
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span key={index} className="badge bg-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
