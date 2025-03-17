import React from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
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
          <h1 className="fw-bold mb-1 text-center">Cadastro</h1>
          <p className="text-muted mb-4">
            Faça seu cadastro com seu melhor email!
          </p>

          <div className="mb-2">
            <input
              className="form-control form-control-lg"
              id="name"
              type="text"
              placeholder="Nome"
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            {errors.name && <p className="text-error">{errors.name.message}</p>}
          </div>

          <div className="mb-2">
            <input
              className="form-control form-control-lg"
              id="email"
              type="email"
              placeholder="E-mail"
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'E-mail inválido',
                },
              })}
            />
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-2">
            <input
              className="form-control form-control-lg"
              id="password"
              type="password"
              placeholder="Senha"
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter pelo menos 6 caracteres',
                },
              })}
            />
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>

          <div className="form-check mb-5 text-start">
            <input
              className="form-check-input"
              type="checkbox"
              id="acceptedTerms"
              {...register('acceptedTerms', {
                required: 'Você deve aceitar os termos',
              })}
            />
            <label className="form-check-label" htmlFor="acceptedTerms">
              Aceito os{' '}
              <a href="/terms" className="text-primary">
                termos e condições
              </a>
            </label>
            {errors.acceptedTerms && (
              <p className="text-error">{errors.acceptedTerms.message}</p>
            )}
          </div>

          <button className="btn btn-primary btn-lg w-100">Cadastrar</button>

          <hr className="my-4" />

          <div className="text-center">
            <p className="text-muted">
              Já tem conta?{' '}
              <a href="/auth/login" className="text-primary">
                Entrar
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
