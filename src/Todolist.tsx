// Todolist.tsx

import React from 'react';
import { Button } from './Button'; // Импортируем компонент Button
import { FilterValuesType } from './App';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: TaskType[]; // Использую тип TaskType вместо Task
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
};

export const Todolist: React.FC<PropsType> = ({ title, tasks, removeTask, changeFilter }) => {
  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div className="input-group">
        <input type="text" placeholder="Add new task" />
        <Button title={'+'} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}> {/* Используем уникальный id для ключа */}
              <input type="checkbox" checked={task.isDone} readOnly />
              <span>{task.title}</span>
              <button onClick={() => removeTask(task.id)}>x</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button title={'All'} onClick={() => changeFilter('all')} />
        <Button title={'Active'} onClick={() => changeFilter('active')} />
        <Button title={'Completed'} onClick={() => changeFilter('completed')} />
      </div>
    </div>
  );
};

//добавлены кнопки, которые вызывают функцию changeFilter при клике, чтобы изменить состояние фильтра в App
// кнопки вызывают changeFilter с правильным типом аргумента ('all', 'active', 'completed')
// при клике на эту кнопку показывать alert с id таски, для которой была нажата кнопка. Для этого передадим в button коллбэк-функцию для onClick
//<button onClick={() => alert(task.id)}>x</button>