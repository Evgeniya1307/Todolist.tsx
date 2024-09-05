import React, { ChangeEvent } from 'react';
import { Button } from './Button'; // Импортируем компонент кнопки
import { FilterValuesType } from './model✳️/types'; // Типы для фильтрации задач
import { AddItemForm } from './AddItemForm'; // Форма для добавления новых задач
import { EditableSpan } from './EditableSpan'; // Редактируемый компонент для заголовков
import IconButton from '@mui/material/IconButton'; // Кнопка с иконкой
import DeleteIcon from '@mui/icons-material/Delete'; // Иконка удаления
import Checkbox from '@mui/material/Checkbox'; // Чекбокс для отметки выполнения задачи
import List from '@mui/material/List'; // Список для отображения задач
import ListItem from '@mui/material/ListItem'; // Элемент списка задач
import Box from '@mui/material/Box'; // Контейнер для кнопок
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles'; // Стили для кнопок фильтрации и задач

// Типы данных для задачи
export type TaskType = {
  id: string; // Уникальный идентификатор задачи
  title: string; // Заголовок задачи
  isDone: boolean; // Статус выполнения задачи
};

// Пропсы для компонента Todolist
export type PropsType = {
  title: string; // Заголовок списка дел
  todolistId: string; // Идентификатор списка дел
  tasks: TaskType[]; // Список задач
  removeTask: (taskId: string, todolistId: string) => void; // Функция для удаления задачи
  removeTodolist: (todolistId: string) => void; // Функция для удаления списка дел
  changeFilter: (filter: FilterValuesType, todolistId: string) => void; // Фильтрация задач
  addTask: (title: string, todolistId: string) => void; // Добавление новой задачи
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void; // Изменение статуса задачи
  currentFilter: FilterValuesType; // Текущий фильтр
  value: string; // Заголовок редактируемого списка дел
  changeTodolistTitle: (newTitle: string, todolistId: string) => void; // Изменение заголовка списка дел
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void; // Изменение заголовка задачи
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
  changeTaskTitle,
}) => {
  
  // Обработчик удаления всего списка дел
  const removeTodolistHandler = () => {
    removeTodolist(todolistId); // Вызов функции удаления с передачей ID списка
  };

  // Обработчик изменения статуса задачи (выполнена/не выполнена)
  const changeTaskStatusHandler = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(taskId, e.currentTarget.checked, todolistId); // Обновляем статус задачи на основе чекбокса
  };

  // Обработчик удаления задачи
  const removeTaskHandler = (taskId: string) => () => {
    removeTask(taskId, todolistId); // Удаляем задачу по её ID и ID списка
  };

  // Обработчик изменения заголовка списка дел
  const changeTitleHandler = (newTitle: string) => {
    changeTodolistTitle(newTitle, todolistId); // Обновляем заголовок списка дел
  };

  // Массив кнопок для фильтрации задач (все, активные, выполненные)
  const filters = [
    { label: 'All', value: 'all', color: 'inherit' },
    { label: 'Active', value: 'active', color: 'primary' },
    { label: 'Completed', value: 'completed', color: 'secondary' }
  ];

  return (
    <div className="todolist">
      <div className="todolist-title-container">
        {/* Редактируемый заголовок списка дел */}
        <h3>
          <EditableSpan value={title} onChange={changeTitleHandler} />
        </h3>
        {/* Кнопка для удаления всего списка дел */}
        <IconButton onClick={removeTodolistHandler} aria-label="Удалить список">
          <DeleteIcon />
        </IconButton>
      </div>

      {/* Форма для добавления новой задачи */}
      <AddItemForm addItem={(title) => addTask(title, todolistId)} />

      {/* Если задач нет, выводим сообщение */}
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {/* Проходим по массиву задач и отображаем их */}
          {tasks.map((task) => (
            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
              {/* Чекбокс для отметки выполнения задачи */}
              <Checkbox
                checked={task.isDone}
                onChange={changeTaskStatusHandler(task.id)} // Изменение статуса задачи
              />
              {/* Редактируемый заголовок задачи */}
              <EditableSpan
  value={task.title}
  onChange={(newTitle) => changeTaskTitle(task.id, newTitle, todolistId)}
  style={{ flexGrow: 1, textDecoration: task.isDone ? 'line-through' : 'none' }} // Используем обычное свойство style
/>
              {/* Кнопка для удаления задачи */}
              <IconButton onClick={removeTaskHandler(task.id)} aria-label="Удалить задачу">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      {/* Кнопки для фильтрации задач (все, активные, выполненные) */}
      <Box sx={filterButtonsContainerSx}>
        {filters.map((filter) => (
         <Button
         key={filter.value}
         variant={currentFilter === filter.value ? 'outlined' : 'text'}
         color={filter.color as 'inherit' | 'primary' | 'secondary'} // Указываем конкретные типы цветов
         title={filter.label}
         onClick={() => changeFilter(filter.value as FilterValuesType, todolistId)}
       />
        ))}
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