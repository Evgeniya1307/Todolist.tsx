import React, { useState, ChangeEvent } from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';

//типы данных для задачи
type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

//пропсы
type PropsType = {
  title: string;
  todolistId: string; // Добавлено поле для id списка дел которые перадаю из App
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void; // Новый пропс
  currentFilter: FilterValuesType; // Новый пропс
};

export const Todolist: React.FC<PropsType> = ({
  title,
  todolistId, // Получение id списка дел
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  currentFilter // Новый пропс
}) => {
  const [taskTitle, setTaskTitle] = useState(''); //хранит текущее значение ввода нов задачи
  const [error, setError] = useState<string | null>(null); //в state хранить текст ошибки (или null, если ошибки нет). И вот если в state есть ошибка - добавляем класс error и показываем сообщение с ошибкой

  const addTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      addTask(taskTitle.trim()); //не пробелов ни пустой строки
      setTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const changeTaskStatusHandler = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(taskId, newStatusValue); // Используем переданный callback
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null); //Если после появления ошибки начать вводить текст, то ошибка не пропадет и поле по прежнему будет выделено красным цветом чтобы избежать то пишем так и обнуляем ошибку
    if (event.key === 'Enter') {
      addTaskHandler();
    }
  };

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div className="input-group">
        <input
          className={error ? 'error' : ''}
          type="text"
          value={taskTitle}
          onChange={event => setTaskTitle(event.currentTarget.value)}
          onKeyUp={handleKeyPress}
        />
        <Button title={'+'} onClick={addTaskHandler} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler(task.id)} // Добавляем обработчик изменения статуса
              />
              <span>{task.title}</span>
              <Button onClick={() => removeTask(task.id)} title={'x'} />
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button
          className={currentFilter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilter('all', todolistId)} // Передаю два аргумента
        />
        <Button
          className={currentFilter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilter('active', todolistId)} // Передаю два аргумента
        />
        <Button
          className={currentFilter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilter('completed', todolistId)} // Передаю два аргумента
        />
      </div>
    </div>
  );
};



//добавлены кнопки, которые вызывают функцию changeFilter при клике, чтобы изменить состояние фильтра в App
// кнопки вызывают changeFilter с правильным типом аргумента ('all', 'active', 'completed')
// при клике на эту кнопку показывать alert с id таски, для которой была нажата кнопка. Для этого передадим в button коллбэк-функцию для onClick
//<button onClick={() => alert(task.id)}>x</button>

//Объект события (event) - это что-то, что происходит в определенный момент времени. Например, когда вы кликаете на кнопку на веб-странице, это событие.


{/* <input ref = {inputRef}/>
<Button title={'+'} onClick={()=>{
  if (inputRef.current){//проверить, существует ли текущий элемент в рефе 
    addTask(inputRef.current.value)//Если элемент существует, то значение из этого элемента (inputRef.current.value) передается в функцию addTask
    inputRef.current.value = ''//очищать input после добавления таски
  }//inputRef.current.value) - то есть значение, введенное пользователем в текстовое поле. Это значение передается в функцию addTask */}