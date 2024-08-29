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

function AppWithReducers() {
  // Тема приложения
  const [themeMode, setThemeMode] = useReducer((state) => (state === 'light' ? 'dark' : 'light'), 'light');
  const theme = createTheme({ palette: { mode: themeMode, primary: { main: '#087EA4' } } });

  // Редьюсер для тудулистов
  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ]);

  // Редьюсер для задач
  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolists[0].id]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    [todolists[1].id]: [
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Bread', isDone: false },
    ],
  } as TasksStateType);

  const removeTask = (taskId: string, todolistId: string) => {
    dispatchTasks(removeTaskAC(taskId, todolistId));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatchTasks(addTaskAC(title, todolistId));
  };

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatchTasks(changeTaskStatusAC(taskId, isDone, todolistId));
  };

  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    dispatchTasks(changeTaskTitleAC(taskId, newTitle, todolistId));
  };

  const removeTodolist = (todolistId: string) => {
    dispatchTodolists(removeTodolistAC(todolistId)); // Удаляем тудулист
    dispatchTasks(removeTodolistAC(todolistId)); // Удаляем все задачи, связанные с этим тудулистом
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title); // Генерируем новый тудулист
    dispatchTodolists(action); // Обновляем список тудулистов
    dispatchTasks(action); // Добавляем пустой список задач для нового тудулиста
  };

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, newTitle)); // Обновляем заголовок тудулиста
  };

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatchTodolists(changeTodolistFilterAC(todolistId, filter)); // Изменяем фильтр задач в тудулисте
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Switch color="default" onChange={() => setThemeMode()} />
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ mb: '30px' }}>
          <AddItemForm addItem={addTodolist} /> 
        </Grid>
        <Grid container spacing={4}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === 'active') {
              tasksForTodolist = tasks[tl.id].filter(task => !task.isDone);
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = tasks[tl.id].filter(task => task.isDone);
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
