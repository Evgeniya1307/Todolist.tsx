import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

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

function App() {
  // Состояние для хранения списка дел
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ]);

  // Состояние для хранения задач
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
    // Обновляем массив задач в конкретном списке дел
    const updatedTasks = tasks[todolistId].map(task =>
      // Если ID задачи совпадает с переданным taskId, создаем новую задачу с обновленным статусом isDone
      task.id === taskId ? { ...task, isDone } : task
    );
    // Обновляем состояние tasks, заменяя старый массив задач на обновленный для указанного списка дел
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
    <div className="App">
      <AddItemForm addItem={addTodolist} /> {/* Использование компонента AddItemForm для добавления нового списка дел */}
      {todolists.map(tl => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = tasks[tl.id];

        // Фильтрация задач в зависимости от текущего фильтра
        if (tl.filter === 'active') {
          tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
        }
        if (tl.filter === 'completed') {
          tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
        }
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={(filter) => changeFilter(filter, tl.id)}
            addTask={(title) => addTask(title, tl.id)}
            changeTaskStatus={(taskId, isDone) => changeTaskStatus(taskId, isDone, tl.id)}
            removeTodolist={removeTodolist}
            currentFilter={tl.filter}
            value={tl.title} // Передача заголовка в Todolist
            changeTodolistTitle={changeTodolistTitle} // Передача функции для изменения заголовка списка дел
            changeTaskTitle={changeTaskTitle} // Передача функции для изменения заголовка задачи
          />
        );
      })}
    </div>
  );
}

export default App;


