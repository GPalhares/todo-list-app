import React, { useState } from 'react';
import UsersTable from './components/table';

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Gabriel Palhares Miranda',
      createdAt: '2025-03-16T23:02:07.516Z',
      email: 'devpalhares@gmail.com',
    },
    {
      id: 2,
      name: 'Pedro',
      createdAt: '2025-03-16T23:03:07.516Z',
      email: 'devpalhares@gmail.com',
    },
    {
      id: 3,
      name: 'Maria francisca da silva',
      createdAt: '2025-01-16T23:02:07.516Z',
      email: 'devpalhares@gmail.com',
    },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((task) => task.id !== id));
  };

  return (
    <div className="d-flex card justify-content-center px-4 px-sm-5 py-5 align-items-center card-with-shadow-border">
      <div style={{ width: '100%' }} className="d-flex mb-5">
        <h2 className="fw-bold">Usuários</h2>
      </div>

      <UsersTable users={users} deleteUser={deleteUser} />
    </div>
  );
}
