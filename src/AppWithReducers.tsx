import React, { useReducer } from 'react';
import './App.css'; 
import { Todolist } from './Todolist'; 
import { v1 } from 'uuid'; 
import { AddItemForm } from './AddItemForm'; 
import AppBar from '@mui/material/AppBar'; 
import Toolbar from '@mui/material/Toolbar'; 
import IconButton from '@mui/material/IconButton'; 
import MenuIcon from '@mui/icons-material/Menu'; 
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import Switch from '@mui/material/Switch'; 
import CssBaseline from '@mui/material/CssBaseline'; 
import Container from '@mui/material/Container'; 
import Grid from '@mui/material/Unstable_Grid2'; 
import Paper from '@mui/material/Paper';
import {
  addTodolistAC,
  removeTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  todolistsReducer
} from './model✳️/todolistsReducer'

import {
  tasksReducer,
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC
} from './model✳️/tasks-reducer'; 
import { TaskType, TodolistType, FilterValuesType, TasksStateType } from './App';

// Главный компонент приложения
function AppWithReducers() {
  // Создаем тему приложения (светлая или темная)
  const [themeMode, setThemeMode] = useReducer((state) => (state === 'light' ? 'dark' : 'light'), 'light');
  const theme = createTheme({ palette: { mode: themeMode, primary: { main: '#087EA4' } } });

  // Используем useReducer для управления состоянием тудулистов
  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    { id: v1(), title: 'What to learn', filter: 'all' },  // Начальные данные тудулистов
    { id: v1(), title: 'What to buy', filter: 'all' },
  ]);

  // Используем useReducer для управления состоянием задач
  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolists[0].id]: [  // Привязываем задачи к первому тудулисту
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    [todolists[1].id]: [  // Привязываем задачи ко второму тудулисту
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Bread', isDone: false },
    ],
  } as TasksStateType);

  // Функция для удаления задачи
  const removeTask = (taskId: string, todolistId: string) => {
    dispatchTasks(removeTaskAC(taskId, todolistId));  // Отправляем action для удаления задачи в reducer
  };

  // Функция для добавления новой задачи
  const addTask = (title: string, todolistId: string) => {
    dispatchTasks(addTaskAC(title, todolistId));  // Отправляем action для добавления задачи в reducer
  };

  // Функция для изменения статуса задачи (выполнена или нет)
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatchTasks(changeTaskStatusAC(taskId, isDone, todolistId));  // Отправляем action для изменения статуса задачи в reducer
  };

  // Функция для изменения заголовка задачи
  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    dispatchTasks(changeTaskTitleAC(taskId, newTitle, todolistId));  // Отправляем action для изменения заголовка задачи в reducer
  };

  // Функция для удаления тудулиста
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);  // Создаем action для удаления тудулиста
    dispatchTodolists(action);  // Отправляем action для удаления тудулиста в todolistsReducer
    dispatchTasks(action);  // Отправляем action для удаления всех задач, связанных с этим тудулистом, в tasksReducer
  };

  // Функция для добавления нового тудулиста
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);  // Создаем action для добавления нового тудулиста
    dispatchTodolists(action);  // Отправляем action для добавления тудулиста в todolistsReducer
    dispatchTasks(action);  // Отправляем action для создания пустого списка задач для нового тудулиста в tasksReducer
  };

  // Функция для изменения заголовка тудулиста
  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, newTitle));  // Отправляем action для изменения заголовка тудулиста в todolistsReducer
  };

  // Функция для изменения фильтра задач в тудулисте (все, активные, выполненные)
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatchTodolists(changeTodolistFilterAC(todolistId, filter));  // Отправляем action для изменения фильтра в todolistsReducer
  };

  return (
    <ThemeProvider theme={theme}>  {/* Применяем выбранную тему ко всему приложению */}
      <CssBaseline />  {/* Устанавливаем базовые стили для всего приложения */}
      <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Switch color="default" onChange={() => setThemeMode()} />  {/* Переключатель темы */}
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ mb: '30px' }}>
          <AddItemForm addItem={addTodolist} />  {/* Форма для добавления нового тудулиста */}
        </Grid>
        <Grid container spacing={4}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === 'active') {
              tasksForTodolist = tasks[tl.id].filter(task => !task.isDone);  // Фильтруем задачи по статусу "активные"
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = tasks[tl.id].filter(task => task.isDone);  // Фильтруем задачи по статусу "выполненные"
            }

            return (
              <Grid key={tl.id} xs={12} md={6} lg={4}>
                <Paper sx={{ p: '20px' }}>
                  <Todolist
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={(filter) => changeFilter(filter, tl.id)}
                    addTask={(title) => addTask(title, tl.id)}
                    changeTaskStatus={(taskId, isDone) => changeTaskStatus(taskId, isDone, tl.id)}
                    removeTodolist={removeTodolist}
                    currentFilter={tl.filter}
                    value={tl.title}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithReducers;