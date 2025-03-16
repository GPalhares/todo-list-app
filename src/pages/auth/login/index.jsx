import React, { useState } from 'react';
import './styles.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember me:', rememberMe);
  };

  return (
    <div className="card m-0 p-0 p-sm-5 card-with-shadow">
      <div className="card-body p-0 p-md-4">
        <form onSubmit={handleSubmit}>
          <h1 className="fw-bold mb-1 text-center">Todo-List</h1>
          <p className="text-muted mb-4">
            Faça login usando seu email e senha!
          </p>

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
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
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
              <a href="#!" className="text-primary">
                Registre-se
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
