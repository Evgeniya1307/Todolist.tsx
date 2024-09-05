import React from 'react'; // Импортируем React для использования JSX
import { render } from '@testing-library/react'; // Импортируем функцию render из библиотеки для тестирования React-компонентов
import App from './app/App'; // Импортируем тестируемый компонент App

// Тест для проверки наличия формы добавления нового элемента
test('renders add item form', () => {
  // Рендерим компонент App
  const { getAllByText } = render(<App />);
  // Ищем все элементы с текстом "Enter a title"
  const addItemFormElements = getAllByText(/Enter a title/i);
  // Проверяем, что найден хотя бы один элемент
  expect(addItemFormElements.length).toBeGreaterThan(0);
});

// Тест для проверки наличия заголовков тудулистов
test('renders todolist titles', () => {
  // Рендерим компонент App
  const { getByText } = render(<App />);
  // Ищем элемент с текстом "What to learn"
  const todolist1Title = getByText(/What to learn/i);
  // Ищем элемент с текстом "What to buy"
  const todolist2Title = getByText(/What to buy/i);
  // Проверяем, что заголовок первого тудулиста присутствует в документе
  expect(todolist1Title).toBeInTheDocument();
  // Проверяем, что заголовок второго тудулиста присутствует в документе
  expect(todolist2Title).toBeInTheDocument();
});
