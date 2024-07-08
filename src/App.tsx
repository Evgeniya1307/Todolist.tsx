import React, { useState } from 'react';
import './App.css'; // Импортируем стили приложения
import { Todolist } from './Todolist'; // Импортируем компонент Todolist
import { v1 } from 'uuid'; // Импортируем функцию для генерации уникальных ID
import { AddItemForm } from './AddItemForm'; // Импортируем компонент AddItemForm
import AppBar from '@mui/material/AppBar'; // Импортируем компонент AppBar из Material-UI
import Toolbar from '@mui/material/Toolbar'; // Импортируем компонент Toolbar из Material-UI
import Typography from '@mui/material/Typography'; // Импортируем компонент Typography из Material-UI
import Container from '@mui/material/Container'; // Импортируем компонент Container из Material-UI
import Grid from '@mui/material/Unstable_Grid2'; // Импортируем компонент Grid из Material-UI (неустойчивый)
import Paper from '@mui/material/Paper'; // Импортируем компонент Paper из Material-UI
import IconButton from '@mui/material/IconButton'; // Импортируем компонент IconButton из Material-UI
import MenuIcon from '@mui/icons-material/Menu'; // Импортируем иконку Menu из Material-UI
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Импортируем createTheme и ThemeProvider
import Switch from '@mui/material/Switch'; // Импортируем компонент Switch из Material-UI
import CssBaseline from '@mui/material/CssBaseline'; // Импортируем компонент CssBaseline из Material-UI
import { MenuButton } from './MenuButton'; // Импортируем компонент MenuButton

// Тип данных для задачи
type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

// Тип данных для списка дел
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

// Тип данных для фильтра
export type FilterValuesType = 'all' | 'active' | 'completed';

// Тип данных для состояния задач
type TasksStateType = {
  [key: string]: TaskType[];
};

// Тип данных для режима темы
type ThemeMode = 'dark' | 'light';

function App() {
  // Создаем состояние для хранения текущего режима темы
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Создаем тему
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4', // Основной цвет
      },
    },
  });

  // Функция для изменения режима темы
  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  // Создаем состояние для хранения списка дел
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ]);

  // Создаем состояние для хранения задач
  const [tasks, setTasks] = useState<TasksStateType>({
    [todolists[0].id]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    [todolists[1].id]: [
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Bread', isDone: false },
    ]
  });

  // Функция для удаления задачи
  const removeTask = (taskId: string, todolistId: string) => {
    const updatedTasks = tasks[todolistId].filter(task => task.id !== taskId);
    setTasks({ ...tasks, [todolistId]: updatedTasks });
  };

  // Функция для удаления списка дел
  const removeTodolist = (todolistId: string) => {
    const newTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(newTodolists);
    const newTasks = { ...tasks };
    delete newTasks[todolistId];
    setTasks(newTasks);
  };

  // Функция для изменения фильтра списка дел
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)));
  };

  // Функция для добавления новой задачи
  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const updatedTasks = [newTask, ...tasks[todolistId]];
    setTasks({ ...tasks, [todolistId]: updatedTasks });
  };

  // Функция для изменения статуса задачи
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const updatedTasks = tasks[todolistId].map(task =>
      task.id === taskId ? { ...task, isDone } : task
    );
    setTasks({ ...tasks, [todolistId]: updatedTasks });
  };

  // Функция для изменения заголовка задачи
  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    const updatedTasks = tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task);
    setTasks({ ...tasks, [todolistId]: updatedTasks });
  };

  // Функция для изменения заголовка списка дел
  const changeTodolistTitle = (newTitle: string, todolistId: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, title: newTitle } : tl)));
  };

  // Функция для добавления нового списка дел
  const addTodolist = (title: string) => {
    const newTodolist: TodolistType = {
      id: v1(),
      title,
      filter: 'all',
    };
    setTodolists([...todolists, newTodolist]);
    setTasks({ ...tasks, [newTodolist.id]: [] });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ mb: '30px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4}>
          {todolists.map(tl => {
            const allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
            }

            return (
              <Grid key={tl.id} xs={12} md={6} lg={4} component="div">
                <Paper sx={{ p: '0 20px 20px 20px' }}>
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

export default App;
