import React from 'react';
import UsersTable from './components/table';
import ProfileButton from '../../../components/profileButton';

export default function Users() {
  return (
    <div className="main-container">
      <div className="d-flex card card-with-shadow-border">
        <div className="d-flex mb-4  w-100 align-items-center justify-content-between">
          <h2 className="fw-bold mb-0">Usuários</h2>
          <ProfileButton />
        </div>

        <UsersTable />
      </div>
    </div>
  );
}
