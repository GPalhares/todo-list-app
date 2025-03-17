import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

export default function UsersTable({ users, setOpen, deleteUser }) {
  const navigate = useNavigate();

  const notify = () => {
    toast.success('ID copiado para a área de transferência!');
  };

  const copyId = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        notify();
      })
      .catch((err) => console.error('Erro ao copiar ID:', err));
  };

  const columns = [
    {
      name: '',
      cell: (row) => (
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            width: '16px',
            height: '16px',
          }}
          onClick={() => copyId(row.id)}
        >
          <img
            src="/assets/icons/copy.svg"
            alt="Copy"
            width="16px"
            height="16px"
          />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '20px',
    },
    {
      name: 'Nome',
      selector: (row) => (
        <div>
          <div className="d-flex justify-content-left fw-bold">{row.name}</div>
          <div
            className="d-flex justify-content-left text-muted"
            style={{ fontSize: '11px' }}
          >
            {row.email}
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Data de Criação',
      selector: (row) => format(new Date(row.createdAt), 'dd/MM/yyyy'),
      sortable: true,
    },
    {
      name: '',
      cell: (row) => (
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            marginRight: '16px',
            width: '16px',
          }}
          onClick={() => deleteUser(row.id)}
        >
          <img
            src="/assets/icons/trash.svg"
            alt="Excluir"
            width="16px"
            height="16px"
          />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: '20px',
    },
  ];

  const handleRowClick = (row) => {
    setOpen('userDetails');
    navigate(`/users/${row.id}`);
  };

  return users.length === 0 ? (
    <p className="my-2 text-muted">{'Nenhum usuário encontrado'}</p>
  ) : (
    <DataTable
      columns={columns}
      data={users}
      pagination
      highlightOnHover
      pointerOnHover
      onRowClicked={handleRowClick}
    />
  );
}
