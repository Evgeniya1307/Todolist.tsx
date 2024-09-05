import React from 'react';
import './App.css';
import { Header } from '../Header'; // Импортируем компонент Header
import { Main } from '../Main'; // Импортируем компонент Main
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { getTheme } from './theme'; // Функция для создания темы

// Компонент App
export const App: React.FC = () => {
  // Получаем текущую тему (светлая или темная) из состояния Redux
  const themeMode = useSelector<RootState, 'light' | 'dark'>((state) => state.app.themeMode);

  // Создаём тему на основе текущего режима
  const theme = getTheme(themeMode);

  return (
    // Применяем глобальную тему через ThemeProvider
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Сбрасываем стили Material UI */}
      
      {/* Компонент Header для отображения навигации и переключения темы */}
      <Header />

      {/* Основной контент приложения (список тудулистов) */}
      <Main />
    </ThemeProvider>
  );
};

export default App;
