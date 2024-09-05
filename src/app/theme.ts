// theme.ts
import { createTheme } from '@mui/material/styles';
import { ThemeMode } from '../app/app-reducer'; // Импортируем тип для темы

// Функция для создания темы, принимает текущий режим (светлая или тёмная)
export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4', // Основной цвет для темы
      },
    },
  });
};
