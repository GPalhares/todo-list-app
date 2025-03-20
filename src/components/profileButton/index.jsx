import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function ProfileButton() {
  const navigate = useNavigate();

  const redirectToAccount = () => {
    navigate('/dashboard/profile');
  };

  return (
    <div className="d-flex w-100 justify-content-end">
      <button
        className="btn btn-outline-primary no-hover"
        onClick={redirectToAccount}
      >
        <img src="/assets/icons/user.svg" alt="Criar" width="13" height="13" />
        <span className="ms-1">Meu Perfil</span>
      </button>
    </div>
  );
}
