import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card m-0 p-0 p-sm-5 card-with-shadow-border">
      <div className="card-body p-0 p-md-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="fw-bold mb-1 text-center">Todo-List</h1>
          <p className="text-muted mb-4">
            Faça login usando seu email e senha!
          </p>

          <div style={{ marginBottom: '6px' }}>
            <input
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

          <div style={{ marginBottom: '6px' }}>
            <input
              {...register('password', { required: 'Senha é obrigatória' })}
              className="form-control form-control-lg"
              id="password"
              type="password"
              placeholder="Senha"
            />
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>

          <div className="form-check mb-5 text-start">
            <input
              {...register('rememberMe')}
              className="form-check-input"
              type="checkbox"
              id="rememberPassword"
            />
            <label className="form-check-label" htmlFor="rememberPassword">
              Manter conectado
            </label>
          </div>

          <button className="btn btn-primary btn-lg w-100">Entrar</button>

          <hr className="my-4" />

          <div className="text-center">
            <p className="text-muted">
              Não tem conta?{' '}
              <a href="/auth/register" className="text-primary">
                Registre-se
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
