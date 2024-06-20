import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
}

export type FilterValuesType = 'all' | 'active' | 'completed';

type TasksStateType = {
  [key: string]: TaskType[];
};

function App() {
  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ]);

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

  // Логика для удаления тудулиста
  const removeTodolist = (todolistId: string) => {
    const newTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(newTodolists);
    const newTasks = { ...tasks };
    delete newTasks[todolistId];
    setTasks(newTasks);
  };

  // Функция для изменения фильтра
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
    const updatedTasks = tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task);
    setTasks({ ...tasks, [todolistId]: updatedTasks });
  };

  return (
    <div className="App">
      {todolists.map(tl => {
        const allTodolistTasks = tasks[tl.id]; // Все задачи для текущего todolist
        let tasksForTodolist = tasks[tl.id]; // Задачи для отображения в текущем todolist

        if (tl.filter === 'active') {
          tasksForTodolist = allTodolistTasks.filter(task => !task.isDone); // Фильтруем только невыполненные задачи
        }
        if (tl.filter === 'completed') {
          tasksForTodolist = allTodolistTasks.filter(task => task.isDone); // Фильтруем только выполненные задачи
        }
        return (
          <Todolist
            key={tl.id} // это специальный пропс, который React использует для отслеживания
            todolistId={tl.id} // это пропс, который передается в компонент Todolist, представляющий уникальный идентификатор текущего списка дел
            title={tl.title} // это пропс, который передается в компонент Todolist, представляющий заголовок текущего списка дел
            tasks={tasksForTodolist} // это пропс, который передается в компонент Todolist, представляющий отфильтрованные задачи для текущего списка дел tasksForTodolist содержит задачи в зависимости от текущего фильтра (all, active, completed)
            removeTask={removeTask} // это функция, которая передается в компонент Todolist для удаления задач. Функция принимает идентификатор задачи и идентификатор списка дел, к которому эта задача относится
            changeFilter={(filter) => changeFilter(filter, tl.id)} // это функция, которая передается в компонент Todolist для изменения фильтра задач. Здесь используется стрелочная функция, чтобы передать filter и tl.id в оригинальную функцию changeFilter в App. Таким образом, функция получает как новый фильтр, так и идентификатор текущего списка дел
            addTask={(title) => addTask(title, tl.id)} // это функция, которая передается в компонент Todolist для добавления новой задачи. Здесь используется стрелочная функция, чтобы передать title и tl.id в оригинальную функцию addTask в App. Таким образом, функция получает как заголовок новой задачи, так и идентификатор текущего списка дел
            changeTaskStatus={(taskId, isDone) => changeTaskStatus(taskId, isDone, tl.id)} // это функция, которая передается в компонент Todolist для изменения статуса задачи. Здесь используется стрелочная функция, чтобы передать taskId, isDone и tl.id в оригинальную функцию changeTaskStatus в App. Таким образом, функция получает идентификатор задачи, новый статус и идентификатор текущего списка дел
            removeTodolist={removeTodolist} // это функция для удаления текущего списка дел
            currentFilter={tl.filter} // передаем текущий фильтр
          />
        );
      })}
    </div>
  );
}

export default App;
