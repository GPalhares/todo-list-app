import React, { useState } from 'react';
import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="card m-0 p-0 p-sm-5 card-with-shadow">
      <div className="card-body p-0 p-md-4">
        <form onSubmit={handleSubmit}>
          <h1 className="fw-bold mb-1 text-center">Cadastro</h1>
          <p className="text-muted mb-4">
            Faça seu cadastro com seu melhor email!
          </p>

          <div style={{ marginBottom: '6px' }}>
            <input
              className="form-control form-control-lg"
              id="name"
              type="name"
              placeholder="Nome"
              value={email}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '6px' }}>
            <input
              className="form-control form-control-lg"
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '6px' }}>
            <input
              className="form-control form-control-lg"
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-check mb-5 text-start">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberPassword"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            <label className="form-check-label" htmlFor="rememberPassword">
              Aceito os{' '}
              <a href="/termos-e-condicoes" className="text-primary">
                termos e condições
              </a>
            </label>
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
