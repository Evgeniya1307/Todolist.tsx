import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; // Импортируем хуки для работы с состоянием
import { AddItemForm } from './AddItemForm';
import { addTodolistAC, changeTodolistFilterAC, removeTodolistAC, changeTodolistTitleAC } from './model✳️/todolistsReducer';
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './model✳️/tasks-reducer';
import { RootState } from './app/store';
import { Todolist } from './Todolist';

export const Main = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch

  // Получаем тудулисты и задачи из глобального состояния Redux
  const todolists = useSelector((state: RootState) => state.todolists);
  const tasks = useSelector((state: RootState) => state.tasks);

  // Функция для добавления нового тудулиста
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  };

  return (
    <Container fixed>
      {/* Форма для добавления нового тудулиста */}
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      {/* Отображение списка тудулистов */}
      <Grid container spacing={4}>
        {todolists.map((tl) => {
          // Получаем задачи для текущего тудулиста
          const tasksForTodolist = tasks[tl.id];

          return (
            <Grid key={tl.id} xs={12} md={6} lg={4}>
              <Paper sx={{ p: '20px' }}>
                {/* Компонент Todolist, куда передаём необходимые пропсы */}
                <Todolist
                  todolistId={tl.id} // Передаём ID тудулиста
                  title={tl.title} // Передаём заголовок тудулиста
                  value={tl.title}
                  tasks={tasksForTodolist} // Передаём задачи для текущего тудулиста
                  removeTask={(taskId) => dispatch(removeTaskAC(taskId, tl.id))} // Функция для удаления задачи
                  addTask={(title) => dispatch(addTaskAC(title, tl.id))} // Функция для добавления новой задачи
                  changeTaskStatus={(taskId, isDone) => dispatch(changeTaskStatusAC(taskId, isDone, tl.id))} // Функция для изменения статуса задачи
                  changeTaskTitle={(taskId, newTitle) => dispatch(changeTaskTitleAC(taskId, newTitle, tl.id))} // Функция для изменения заголовка задачи
                  removeTodolist={() => dispatch(removeTodolistAC(tl.id))} // Функция для удаления тудулиста
                  changeFilter={(filter) => dispatch(changeTodolistFilterAC(tl.id, filter))} // Функция для изменения фильтра
                  currentFilter={tl.filter} // Передаём текущий фильтр
                  changeTodolistTitle={(newTitle) => dispatch(changeTodolistTitleAC(tl.id, newTitle))} // Функция для изменения заголовка тудулиста
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
