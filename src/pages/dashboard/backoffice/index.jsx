import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';

export default function Backoffice() {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCreateTask = () => {
    if (task) {
      const newTask = {
        id: tasks.length + 1,
        task,
        createdAt: new Date(),
        completed: false, // Status inicial como não concluído
      };
      setTasks([...tasks, newTask]);
      setTask('');
      handleClose();
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const columns = [
    {
      name: '✔',
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.completed}
          onChange={() => toggleComplete(row.id)}
        />
      ),
      width: '50px',
    },
    {
      name: 'Tarefa',
      selector: (row) => row.task,
      sortable: true,
      cell: (row) => (
        <div
          style={{
            textDecoration: row.completed ? 'line-through' : 'none',
            opacity: row.completed ? 0.5 : 1,
          }}
        >
          {row.task}
          <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
            Criada em: {format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm')}
          </div>
        </div>
      ),
    },
    {
      name: 'Data de Criação',
      selector: (row) => new Date(row.createdAt),
      format: (row) => format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm'),
      sortable: true,
    },
  ];

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Suas Tarefas</h2>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={handleShow}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Criar Tarefa
            </button>
          </div>

          <DataTable
            columns={columns}
            data={tasks}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noHeader
            customStyles={{
              headCells: {
                style: { backgroundColor: '#f8f9fa', fontWeight: 'bold' },
              },
              cells: { style: { padding: '10px', textAlign: 'left' } },
            }}
          />
        </div>
      </div>

      {show && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Criar Tarefa</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Descreva sua tarefa</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Exemplo: Comprar leite"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Fechar
                </button>
                <button className="btn btn-primary" onClick={handleCreateTask}>
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
