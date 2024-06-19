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

function App() {
  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ]);

  // Функция для удаления задачи
  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    setTasks(filteredTasks);
  };

  // Функция для изменения фильтра. Исправлено, чтобы учитывать id списка дел.
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)));
  };

  // Функция для добавления новой задачи
  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };

    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  // Функция для изменения статуса задачи
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, isDone } : task);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      {todolists.map(tl => {
        // Фильтрация задач на основе текущего фильтра списка дел
        let tasksForTodolist = tasks;
        if (tl.filter === 'active') {
          tasksForTodolist = tasks.filter(task => !task.isDone);
        }
        if (tl.filter === 'completed') {
          tasksForTodolist = tasks.filter(task => task.isDone);
        }
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id} // Передача id списка дел
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            // Передача функции changeFilter с учетом id списка дел
            changeFilter={(filter) => changeFilter(filter, tl.id)}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            currentFilter={tl.filter} // Передача текущего фильтра в компонент Todolist
          />
        )
      })}
    </div>
  );
}

export default App;


