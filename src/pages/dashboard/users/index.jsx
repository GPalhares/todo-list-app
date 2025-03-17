import React, { useState } from 'react';
import UsersTable from './components/table';

export default function Users() {
  const [users, setUsers] = useState([]);

  const deleteUser = (id) => {
    setUsers(users.filter((task) => task.id !== id));
  };

  return (
    <div className="d-flex card justify-content-center px-4 px-sm-5 py-5 align-items-center card-with-shadow-border">
      <div style={{ width: '100%' }} className="d-flex mb-4">
        <h2 className="fw-bold">Usuários</h2>
      </div>

      <UsersTable users={users} deleteUser={deleteUser} />
    </div>
  );
}
