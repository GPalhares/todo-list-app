import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-1 text-primary" style={{ fontSize: '10rem' }}>
          404
        </h1>
        <h3 className="mb-4 text-dark">Página Não Encontrada</h3>
        <p className="lead text-dark">
          Parece que a página que você está procurando não existe.
        </p>
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
  );
}
