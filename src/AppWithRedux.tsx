import React, { useReducer } from 'react';
import './App.css'; 
import { Todolist } from './Todolist'; 
import { useSelector, useDispatch } from 'react-redux';
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
import { RootState } from './app/store';
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
function AppWithRedux() {
    const dispatch = useDispatch(); // Получаем функцию dispatch для отправки действий в Redux store
    const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists); // Достаем тудулисты из состояния
    const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks); // Достаем задачи из состояния
  
    const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light'); // Управляем темой (светлая/темная)
    const theme = createTheme({ palette: { mode: themeMode, primary: { main: '#087EA4' } } }); // Создаем тему для приложения
  
    // Функция для удаления задачи
    const removeTask = (taskId: string, todolistId: string) => {
      dispatch(removeTaskAC(taskId, todolistId)); // Отправляем action для удаления задачи
    };
  
    // Функция для добавления новой задачи
    const addTask = (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId)); // Отправляем action для добавления задачи
    };
  
    // Функция для изменения статуса задачи
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(taskId, isDone, todolistId)); // Отправляем action для изменения статуса задачи
    };
  
    // Функция для изменения заголовка задачи
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(taskId, newTitle, todolistId)); // Отправляем action для изменения заголовка задачи
    };
  
    // Функция для удаления тудулиста
    const removeTodolist = (todolistId: string) => {
      dispatch(removeTodolistAC(todolistId)); // Отправляем action для удаления тудулиста
    };
  
    // Функция для добавления нового тудулиста
    const addTodolist = (title: string) => {
      dispatch(addTodolistAC(title)); // Отправляем action для добавления нового тудулиста
    };
  
    // Функция для изменения заголовка тудулиста
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle)); // Отправляем action для изменения заголовка тудулиста
    };
  
    // Функция для изменения фильтра задач (все, активные, выполненные)
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, filter)); // Отправляем action для изменения фильтра
    };
  
    return (
      <ThemeProvider theme={theme}> {/* Применяем тему */}
        <CssBaseline /> {/* Добавляем глобальные стили */}
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Switch color="default" onChange={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} /> {/* Переключатель темы */}
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container sx={{ mb: '30px' }}>
            <AddItemForm addItem={addTodolist} /> {/* Форма для добавления нового тудулиста */}
          </Grid>
          <Grid container spacing={4}>
            {todolists.map((tl) => {
              let tasksForTodolist = tasks[tl.id]; // Получаем задачи для текущего тудулиста
              if (tl.filter === 'active') {
                tasksForTodolist = tasks[tl.id].filter((task) => !task.isDone); // Фильтруем задачи по статусу "активные"
              }
              if (tl.filter === 'completed') {
                tasksForTodolist = tasks[tl.id].filter((task) => task.isDone); // Фильтруем задачи по статусу "выполненные"
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
  
  export default AppWithRedux;