import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../../hooks/useLogout';
import { useAuth } from '../../../contexts/AuthContext';
import { useJoke } from '../../../hooks/useJoke'; // Importe o custom hook
import api from '../../../services/api';
import { toast } from 'react-toastify';

export default function Profile() {
  const { joke, loading, error, fetchJoke } = useJoke();

  const { logout } = useLogout();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.patch('/users/me', data);
      setUser(response.data);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message || 'Erro ao atualizar perfil.');
    }
  };

  const goBack = () => {
    if (user?.userType === 1) {
      navigate('/dashboard/tasks');
    }

    if (user?.userType === 2) {
      navigate('/dashboard/users');
    }
  };

  return (
    user && (
      <div className="main-container">
        <div className="d-flex card card-with-shadow-border">
          <div className="d-flex mb-4  w-100 align-items-center justify-content-between">
            <h2 className="fw-bold mb-0">Meu Perfil</h2>
            <button onClick={goBack} className="btn btn-outline-secondary">
              Voltar
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <input
                defaultValue={user.name}
                {...register('name', { required: 'Nome é obrigatório' })}
                className="form-control form-control-lg"
                id="name"
                type="text"
                placeholder="Nome"
              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-2">
              <input
                defaultValue={user.email}
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: 'Email inválido',
                  },
                })}
                className="form-control form-control-lg"
                id="email"
                type="email"
                placeholder="E-mail"
              />
              {errors.email && (
                <p className="text-error">{errors.email.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Salvar
            </button>
          </form>

          <div className="mb-3">
            <button
              className="btn btn-outline-primary mt-3"
              onClick={fetchJoke}
              disabled={loading}
            >
              {loading ? 'Carregando piada...' : 'Gerar Piada'}
            </button>
          </div>

          {joke && <p className="text-muted">{joke}</p>}
          {error && <p className="text-error">{error}</p>}

          <div className="d-flex w-100 justify-content-end">
            <button className="btn btn-outline-danger mt-5" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
}
