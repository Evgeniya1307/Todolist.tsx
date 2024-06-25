import React, { ChangeEvent } from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

// Типы данных для задачи
type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

// Пропсы
type PropsType = {
  title: string; // Заголовок списка дел
  todolistId: string; // ID списка дел
  tasks: TaskType[]; // Массив задач
  removeTask: (taskId: string, todolistId: string) => void; // Функция для удаления задачи
  removeTodolist: (todolistId: string) => void; // Функция для удаления списка дел
  changeFilter: (filter: FilterValuesType, todolistId: string) => void; // Функция для изменения фильтра
  addTask: (title: string, todolistId: string) => void; // Функция для добавления задачи
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void; // Функция для изменения статуса задачи
  currentFilter: FilterValuesType; // Текущий фильтр списка дел
  value: string; // Значение заголовка
  changeTodolistTitle: (newTitle: string, todolistId: string) => void; // Функция для изменения заголовка списка дел
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void; // Функция для изменения заголовка задачи
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
  currentFilter,
  value,
  changeTodolistTitle,
  changeTaskTitle
}) => {
  // Функция для удаления списка дел
  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  // Обработчик для изменения статуса задачи
  const changeTaskStatusHandler = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(taskId, newStatusValue, todolistId); // Изменение статуса задачи с учетом todolistId
  };

  // Обработчик для изменения заголовка списка дел
  const changeTitleHandler = (newTitle: string) => {
    changeTodolistTitle(newTitle, todolistId);
  };

  return (
    <div className="todolist">
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan value={title} onChange={changeTitleHandler} /> {/* Компонент EditableSpan для редактирования заголовка */}
        </h3>
        <Button title={'x'} onClick={removeTodolistHandler} /> {/* Кнопка для удаления списка дел */}
      </div>
      <AddItemForm addItem={(title) => addTask(title, todolistId)}/> {/* Форма для добавления новой задачи */}
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
              <EditableSpan value={task.title} onChange={(newTitle) => changeTaskTitle(task.id, newTitle, todolistId)} /> {/* Компонент EditableSpan для редактирования заголовка задачи */}
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