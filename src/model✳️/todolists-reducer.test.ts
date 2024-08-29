import { v1 } from 'uuid';
import { TodolistType } from '../App'; // Импортируем тип для тудулиста
import { todolistsReducer, removeTodolistAC, addTodolistAC } from './todolistsReducer'; // Импортируем редьюсер и экшены

// Объявляем переменные для общего использования в тестах
let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[];

// Используем beforeEach для подготовки данных перед каждым тестом
beforeEach(() => {
  // Генерируем уникальные идентификаторы для тудулистов
  todolistId1 = v1();
  todolistId2 = v1();
  
  // Определяем стартовое состояние для всех тестов
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
});

test('correct todolist should be removed', () => {
  // Тестируем удаление тудулиста с id = todolistId1
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));
  
  // Проверяем, что остался только один тудулист
  expect(endState.length).toBe(1);
  // Проверяем, что этот тудулист имеет id todolistId2
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  // Тестируем добавление нового тудулиста
  const newTodolistTitle = 'New Todolist';
  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));
  
  // Проверяем, что теперь у нас три тудулиста
  expect(endState.length).toBe(3);
  // Проверяем, что заголовок нового тудулиста соответствует переданному
  expect(endState[2].title).toBe(newTodolistTitle);
});
