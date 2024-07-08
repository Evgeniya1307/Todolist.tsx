import React, { ChangeEvent } from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles'; // Импортируем стили

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
  removeTodolist: (todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  currentFilter: FilterValuesType;
  value: string;
  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
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
    changeTaskStatus(taskId, newStatusValue, todolistId);
  };

  // Обработчик для изменения заголовка списка дел
  const changeTitleHandler = (newTitle: string) => {
    changeTodolistTitle(newTitle, todolistId);
  };

  // Обработчик для удаления задачи
  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId, todolistId);
  };

  return (
    <div className="todolist">
      <div className="todolist-title-container">
        <h3>
          <EditableSpan value={title} onChange={changeTitleHandler} /> {/* Используем EditableSpan для редактирования заголовка */}
        </h3>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton> {/* Кнопка для удаления списка дел */}
      </div>
      <AddItemForm addItem={(title) => addTask(title, todolistId)} /> {/* Форма для добавления новой задачи */}
      {tasks.length === 0 ? (
        <p>Тасок нет</p> // Отображение сообщения, если задач нет
      ) : (
        <List>
          {tasks.map(task => (
            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Checkbox
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler(task.id)}
                />
                <EditableSpan
                  value={task.title}
                  onChange={(newTitle) => changeTaskTitle(task.id, newTitle, todolistId)}
                  style={{ flexGrow: 1, textDecoration: task.isDone ? 'line-through' : 'none' }} // Используем style для стилизации
                />
              </div>
              <IconButton onClick={() => removeTaskHandler(task.id)}>
                <DeleteIcon />
              </IconButton> {/* Кнопка для удаления задачи */}
            </ListItem>
          ))}
        </List>
      )}
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={currentFilter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          title={'All'}
          onClick={() => changeFilter('all', todolistId)} // Вызов changeFilter для фильтра 'all'
        />
        <Button
          variant={currentFilter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          title={'Active'}
          onClick={() => changeFilter('active', todolistId)} // Вызов changeFilter для фильтра 'active'
        />
        <Button
          variant={currentFilter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          title={'Completed'}
          onClick={() => changeFilter('completed', todolistId)} // Вызов changeFilter для фильтра 'completed'
        />
      </Box>
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