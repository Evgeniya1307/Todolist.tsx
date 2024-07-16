import React, { useState, useReducer } from 'react';
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
import { todolistsReducer } from './model✳️/todolistsReducer'; // Импортируем редьюсер

// Тип данных для задачи
type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

// Тип данных для списка дел
export type TodolistType = {
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

  // Инициализируем редьюсер для управления состоянием тудулистов
  const [todolists, dispatch] = useReducer(todolistsReducer, [
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
    const updatedTasks = tasks[todolistId].filter(task => task.id !== taskId); // Фильтруем задачи, удаляя указанную
    setTasks({ ...tasks, [todolistId]: updatedTasks }); // Обновляем состояние задач
  };

  // Функция для удаления списка дел
  const removeTodolist = (todolistId: string) => {
    dispatch({ type: 'REMOVE-TODOLIST', payload: { id: todolistId } }); // Отправляем action для удаления тудулиста
    const newTasks = { ...tasks }; // Копируем текущее состояние задач
    delete newTasks[todolistId]; // Удаляем задачи, связанные с указанным списком дел
    setTasks(newTasks); // Обновляем состояние задач
  };

  // Функция для изменения фильтра списка дел
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatch({ type: 'CHANGE-TODOLIST-FILTER', payload: { id: todolistId, filter } }); // Отправляем action для изменения фильтра
  };

  // Функция для добавления новой задачи
  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    }; // Создаем новую задачу
    const updatedTasks = [newTask, ...tasks[todolistId]]; // Добавляем новую задачу в список задач
    setTasks({ ...tasks, [todolistId]: updatedTasks }); // Обновляем состояние задач
  };

  // Функция для изменения статуса задачи
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const updatedTasks = tasks[todolistId].map(task =>
      task.id === taskId ? { ...task, isDone } : task
    ); // Обновляем статус задачи
    setTasks({ ...tasks, [todolistId]: updatedTasks }); // Обновляем состояние задач
  };

  // Функция для изменения заголовка задачи
  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    const updatedTasks = tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task);
    setTasks({ ...tasks, [todolistId]: updatedTasks }); // Обновляем состояние задач
  };

  // Функция для изменения заголовка списка дел
  const changeTodolistTitle = (newTitle: string, todolistId: string) => {
    dispatch({ type: 'CHANGE-TODOLIST-TITLE', payload: { id: todolistId, title: newTitle } }); // Отправляем action для изменения заголовка
  };

  // Функция для добавления нового списка дел
  const addTodolist = (title: string) => {
    const newTodolistId = v1(); // Создаем новый уникальный ID для тудулиста
    dispatch({ type: 'ADD-TODOLIST', payload: { title, id: newTodolistId } }); // Отправляем action для добавления нового тудулиста
    setTasks({ ...tasks, [newTodolistId]: [] }); // Добавляем новый пустой список задач
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
          <AddItemForm addItem={addTodolist} /> {/* Форма для добавления нового тудулиста */}
        </Grid>

        <Grid container spacing={4}>
          {todolists.map((tl: TodolistType) => {
            const allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter(task => !task.isDone); // Фильтрация задач для отображения только невыполненных
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter(task => task.isDone); // Фильтрация задач для отображения только выполненных
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
