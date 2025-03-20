import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import LoadingCircular from '../../../../../components/loadingCircular';
import { useUsers } from '../../../../../contexts/UsersContext';

export default function UsersTable() {
  const { users, loading, deleteUser, restoreUser } = useUsers();

  const notify = () => {
    toast.success('ID copiado para a área de transferência!');
  };

  const copyId = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => notify())
      .catch((err) => console.error('Erro ao copiar ID:', err));
  };

  const columns = useMemo(
    () => [
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
        width: '10%',
      },
      {
        name: 'Nome',
        selector: (row) => (
          <div>
            <div className="d-flex justify-content-left fw-bold">
              {row.name}
            </div>
            <div
              className="d-flex justify-content-left text-muted"
              style={{ fontSize: '11px' }}
            >
              {row.email}
            </div>
          </div>
        ),
        sortable: true,
        sortFunction: (a, b) => a.name.localeCompare(b.name),
        width: '40%',
      },
      {
        name: 'Status',
        selector: (row) => {
          const status = row.deletedAt ? 'Excluído' : 'Ativo';
          const statusColor = row.deletedAt ? '#dc3545' : '#0d6efd';
          return <span style={{ color: statusColor }}>{status}</span>;
        },
        sortable: true,
        sortFunction: (a, b) => (a.deletedAt ? 1 : 0) - (b.deletedAt ? 1 : 0),
        width: '25%',
      },
      {
        name: '',
        cell: (row) => (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                width: '16px',
                height: '16px',
              }}
              onClick={() =>
                row.deletedAt ? restoreUser(row.id) : deleteUser(row.id)
              }
            >
              <img
                src={
                  row.deletedAt
                    ? '/assets/icons/recycle.svg'
                    : '/assets/icons/trash.svg'
                }
                alt={row.deletedAt ? 'Restaurar' : 'Excluir'}
                width="16px"
                height="16px"
              />
            </button>
          </div>
        ),
        width: '25%',
      },
    ],
    [deleteUser, restoreUser]
  );

  return loading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '200px' }}
    >
      <LoadingCircular />
    </div>
  ) : users.length === 0 ? (
    <p className="my-2 text-muted">{'Nenhum usuário encontrado'}</p>
  ) : (
    <div style={{ overflowX: 'auto' }}>
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        pointerOnHover
        noHeader
        responsive
      />
    </div>
  );
}
