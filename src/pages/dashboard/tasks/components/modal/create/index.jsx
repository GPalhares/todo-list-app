import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateTags } from '../../../../../../services/chatgpt';
import { useTasks } from '../../../../../../contexts/TaskContext';
import LoadingCircular from '../../../../../../components/loadingCircular';

export default function CreateTask({ setOpen }) {
  const { createTask } = useTasks();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm();

  const [tags, setTags] = useState([]);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const newTask = {
      description: data.description,
      createdAt: new Date(),
      tags: tags,
    };
    createTask(newTask);
    setOpen(null);
    reset();
    setTags([]);
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;

    if (description.length >= 5) {
      clearErrors('description');
    }

    setShowGenerateButton(description.length >= 5);
  };

  const handleGenerateTags = async () => {
    setLoading(true);
    const description = watch('description');

    try {
      const generatedTags = await generateTags(description, tags);
      setTags(generatedTags);
    } catch (error) {
      console.error('Erro ao gerar tags', error);
    } finally {
      setLoading(false);
    }
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
                    minLength: {
                      value: 5,
                      message: 'A tarefa deve ter pelo menos 5 caracteres',
                    },
                  })}
                  onChange={handleDescriptionChange}
                />
                {errors.description && (
                  <p className="text-error">{errors.description.message}</p>
                )}
              </div>

              {showGenerateButton && (
                <div className="d-flex justify-content-center">
                  <button
                    style={{ color: '#0d6efd' }}
                    type="button"
                    className="btn btn-text-primary d-flex align-items-center"
                    onClick={handleGenerateTags}
                    disabled={loading}
                  >
                    {loading ? (
                      <LoadingCircular />
                    ) : (
                      <>
                        <img
                          src="/assets/icons/magic-wand.svg"
                          alt="Criar"
                          width="16"
                          height="16"
                        />
                        <span className="ms-2">
                          {tags.length > 0
                            ? 'Gerar Novas Tags com IA'
                            : 'Gerar Tags com IA'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {tags.length > 0 && (
                <div className="mt-4">
                  <strong>Tags geradas:</strong>
                  <div className="d-flex mt-1 flex-wrap gap-2 justify-content-center">
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
