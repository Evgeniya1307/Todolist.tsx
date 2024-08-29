import { tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './tasks-reducer'; // Импортируем редьюсер и экшены
import { TasksStateType } from '../App'; // Импортируем тип для состояния задач
import { v1 } from 'uuid';

// Объявляем переменные для общего использования в тестах
let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType;

// Используем beforeEach для подготовки данных перед каждым тестом
beforeEach(() => {
  // Генерируем уникальные идентификаторы для тудулистов
  todolistId1 = v1();
  todolistId2 = v1();

  // Определяем стартовое состояние для всех тестов
  startState = {
    [todolistId1]: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  // Тестируем удаление задачи с id = '2' из тудулиста todolistId2
  const endState = tasksReducer(startState, removeTaskAC('2', todolistId2));

  // Проверяем, что в todolistId2 остались только две задачи
  expect(endState[todolistId2].length).toBe(2);
  // Проверяем, что задачи с id = '2' больше нет
  expect(endState[todolistId2].find(t => t.id === '2')).toBeUndefined();
});

test('correct task should be added to correct array', () => {
  // Тестируем добавление задачи 'juice' в todolistId2
  const endState = tasksReducer(startState, addTaskAC('juice', todolistId2));

  // Проверяем, что в todolistId2 теперь четыре задачи
  expect(endState[todolistId2].length).toBe(4);
  // Проверяем, что первая задача в todolistId2 имеет заголовок 'juice'
  expect(endState[todolistId2][0].title).toBe('juice');
});

test('status of specified task should be changed', () => {
  // Тестируем изменение статуса задачи с id = '2' в todolistId2
  const endState = tasksReducer(startState, changeTaskStatusAC('2', false, todolistId2));

  // Проверяем, что статус задачи с id = '2' изменился на false
  expect(endState[todolistId2][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {
  // Тестируем изменение заголовка задачи с id = '2' в todolistId2 на 'water'
  const endState = tasksReducer(startState, changeTaskTitleAC('2', 'water', todolistId2));

  // Проверяем, что заголовок задачи с id = '2' изменился на 'water'
  expect(endState[todolistId2][1].title).toBe('water');
});
