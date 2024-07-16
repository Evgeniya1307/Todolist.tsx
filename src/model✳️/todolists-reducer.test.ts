import { v1 } from 'uuid'; // Импортируем функцию генерации уникальных идентификаторов
import {
  todolistsReducer,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC
} from './todolistsReducer'; // Импортируем редьюсер и action creators
import { TodolistType, FilterValuesType } from '../App'; // Импортируем тип TodolistType и FilterValuesType

// Тест для проверки удаления правильного списка дел
test('correct todolist should be removed', () => {
  let todolistId1 = v1(); // Генерируем уникальный идентификатор для первого списка дел
  let todolistId2 = v1(); // Генерируем уникальный идентификатор для второго списка дел

  // 1. Стартовый state
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  // 2. Действие
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1)); // Используем action creator для создания экшена

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1); // Ожидаем, что длина конечного состояния будет 1
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2); // Ожидаем, что единственный оставшийся список дел будет иметь идентификатор todolistId2
});

// Тест для проверки добавления нового списка дел
test('correct todolist should be added', () => {
  let todolistId1 = v1(); // Генерация уникального идентификатора для первого списка дел
  let todolistId2 = v1(); // Генерация уникального идентификатора для второго списка дел

  // Стартовый state
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const newTitle = 'New Todolist'; // Определяем заголовок для нового тудулиста

  // Действие
  const endState = todolistsReducer(startState, addTodolistAC(newTitle)); // Используем action creator для создания экшена

  // Проверка
  expect(endState.length).toBe(3); // Ожидаем, что длина конечного состояния будет 3
  expect(endState[2].title).toBe(newTitle); // Ожидаем, что заголовок нового списка дел будет "New Todolist"
});

// Тест для проверки изменения заголовка списка дел
test('correct todolist should change its name', () => {
  let todolistId1 = v1(); // Генерация уникального идентификатора для первого списка дел
  let todolistId2 = v1(); // Генерация уникального идентификатора для второго списка дел

  // Стартовый state
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const newTitle = 'New Todolist'; // Определяем новый заголовок

  // Действие
  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitle)); // Используем action creator для создания экшена

  // Проверка
  expect(endState[0].title).toBe('What to learn'); // Ожидаем, что заголовок первого списка дел останется "What to learn"
  expect(endState[1].title).toBe(newTitle); // Ожидаем, что заголовок второго списка дел станет "New Todolist"
});

// Тест для проверки изменения фильтра списка дел
test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1(); // Генерация уникального идентификатора для первого списка дел
  let todolistId2 = v1(); // Генерация уникального идентификатора для второго списка дел

  // Стартовый state
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const newFilter: FilterValuesType = 'completed'; // Определяем новый фильтр

  // Действие
  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter)); // Используем action creator для создания экшена

  // Проверка
  expect(endState[0].filter).toBe('all'); // Ожидаем, что фильтр первого списка дел останется "all"
  expect(endState[1].filter).toBe(newFilter); // Ожидаем, что фильтр второго списка дел станет "completed"
});
