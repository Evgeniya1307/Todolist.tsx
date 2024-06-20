import React, { useState, ChangeEvent } from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';

// Типы данных для задачи
type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

// Пропсы
type PropsType = {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void; // Добавляем removeTodolist как пропс
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  currentFilter: FilterValuesType;
};

export const Todolist: React.FC<PropsType> = ({
  title,
  todolistId,
  tasks,
  removeTask,
  removeTodolist,
  changeFilter,
  addTask,
  changeTaskStatus,
  currentFilter
}) => {
  //будет выз-ся для удаления списка дел
  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  // Стейт для хранения заголовка новой задачи
  const [taskTitle, setTaskTitle] = useState('');
  // Стейт для хранения ошибки
  const [error, setError] = useState<string | null>(null); //либо строка либо нул

  // Обработчик для добавления новой задачи
  const addTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      addTask(taskTitle.trim(), todolistId); // Добавление новой задачи с учетом todolistId
      setTaskTitle(''); // Очистка поля ввода после добавления задачи
    } else {
      setError('Title is required'); // Установка ошибки, если заголовок пустой
    }
  };

  // Обработчик для изменения статуса задачи
  const changeTaskStatusHandler = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(taskId, newStatusValue, todolistId); // Изменение статуса задачи с учетом todolistId
  };

  // Обработчик для нажатия клавиши Enter в поле ввода
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null); // Сброс ошибки при вводе текста
    if (event.key === 'Enter') {
      addTaskHandler(); // Вызов добавления задачи при нажатии Enter
    }
  };

  return (
    <div className="todolist">
      <div className={'todolist-title-container'}>
        <h3>{title}</h3>
        <Button title={'x'} onClick={removeTodolistHandler} />
      </div>
      <div className="input-group">
        <input
          className={error ? 'error' : ''}
          type="text"
          value={taskTitle}
          onChange={event => setTaskTitle(event.currentTarget.value)} // Обновление стейта taskTitle при изменении текста
          onKeyUp={handleKeyPress} // Вызов handleKeyPress при отпускании клавиши
        />
        <Button title={'+'} onClick={addTaskHandler} /> {/* Кнопка для добавления новой задачи */}
        {error && <div className={'error-message'}>{error}</div>} {/* Сообщение об ошибке */}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p> // Отображение сообщения, если задач нет
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler(task.id)} // Обработчик изменения статуса задачи
              />
              <span>{task.title}</span>
              <Button onClick={() => removeTask(task.id, todolistId)} title={'x'} /> {/* Кнопка для удаления задачи */}
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button
          className={currentFilter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilter('all', todolistId)} // Вызов changeFilter для фильтра 'all'
        />
        <Button
          className={currentFilter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilter('active', todolistId)} // Вызов changeFilter для фильтра 'active'
        />
        <Button
          className={currentFilter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilter('completed', todolistId)} // Вызов changeFilter для фильтра 'completed'
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