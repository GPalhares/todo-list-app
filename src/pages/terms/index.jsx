import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="display-3 text-primary mb-4">Teste TO-DO-LIST</h1>

          <div className="mb-4">
            <p className="lead text-dark">
              Este é um projeto para o processo seletivo de Desenvolvedor Web
              Pleno para a empresa DeMaria.
            </p>
          </div>

          <div className="mb-4">
            <p className="text-dark">
              Obrigado por acessar este projeto. Confira a página do{' '}
              <a
                href="https://github.com/GPalhares/todo-list-app"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{' '}
              para conferir todas as funcionalidades!
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-primary btn-lg"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
