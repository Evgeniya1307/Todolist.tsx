import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };

  

    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeTaskStatus = (taskId: string, taskStatus: boolean) => {//фу-ия прин 2 аргумента строку индефикатор задач и статус который менять
    const newState = tasks.map(t => (t.id == taskId ? { ...t, isDone: taskStatus } : t))//метод map для создания нового массива задач (tasks), который основывается на текущем массиве tasks/map проходит по каждой задаче (t) в массиве tasks/Для каждой задачи проверяется, совпадает ли ее id с переданным taskId
    setTasks(newState)//обновл состояние tasks новым массивом задач
  }
  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => !task.isDone);
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus} // Передача функции changeTaskStatus в компонент Todolist
      />
    </div>
  );
}

export default App;

