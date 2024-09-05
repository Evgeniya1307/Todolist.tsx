import { v1 } from 'uuid';
import { TodolistType } from '../model✳️/types'
import { todolistsReducer, removeTodolistAC, addTodolistAC } from '../model✳️/todolistsReducer';


let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[];

// Инициализация данных перед каждым тестом
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
});

// Тест для удаления тудулиста
test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2); // Проверяем, что удален правильный тудулист
});

// Тест для добавления тудулиста
test('correct todolist should be added', () => {
  const newTodolistTitle = 'New Todolist';
  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3); // Проверяем, что тудулист добавлен
  expect(endState[2].title).toBe(newTodolistTitle); // Проверяем заголовок нового тудулиста
});
