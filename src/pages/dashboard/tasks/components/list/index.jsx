import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTasks } from '../../../../../contexts/TaskContext';
import LoadingCircular from '../../../../../components/loadingCircular';
import TaskItem from './taskItem';

export default function TaskList({ setOpen }) {
  const { tasks, loading } = useTasks();

  const [filter, setFilter] = useState('all');

  const { register, watch } = useForm();

  const descriptionFilterValue = watch('descriptionFilter');

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task) => {
      const matchesDescription =
        !descriptionFilterValue ||
        task.description
          .toLowerCase()
          .includes(descriptionFilterValue.toLowerCase());
      if (filter === 'all') return matchesDescription;
      if (filter === 'completed') return task.completed && matchesDescription;
      if (filter === 'inProgress') return !task.completed && matchesDescription;
      return false;
    });
  }, [tasks, filter, descriptionFilterValue]);

  const filterOptions = [
    { label: 'Todas', value: 'all' },
    { label: 'Concluídas', value: 'completed' },
    { label: 'Em andamento', value: 'inProgress' },
  ];

  return (
    <div className="row justify-content-center">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <LoadingCircular />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-left mb-3">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Filtrar por descrição"
              {...register('descriptionFilter')}
              style={{ fontSize: '12px' }}
            />
          </div>

          <div className="d-flex mb-3 justify-content-left">
            {filterOptions.map((option) => (
              <button
                className={`btn btn-outline-secondary me-2 ${
                  filter === option.value ? 'active' : ''
                }`}
                key={option.value}
                style={{
                  borderRadius: '16px',
                  padding: '1.5px 7px',
                  fontSize: '12px',
                }}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {filteredTasks?.length === 0 ? (
            <p className="my-2 text-muted">
              {tasks?.length === 0
                ? 'Crie sua primeira tarefa para começar!'
                : `Não foram encontradas tarefas ${filterOptions
                    .find((option) => option.value === filter)
                    ?.label.toLowerCase()}!`}
            </p>
          ) : (
            <ul>
              {filteredTasks?.map((task) => (
                <TaskItem key={task.id} task={task} setOpen={setOpen} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
