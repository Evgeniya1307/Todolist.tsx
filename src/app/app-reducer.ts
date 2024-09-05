// app-reducer.ts
export type ThemeMode = 'dark' | 'light';

// Начальное состояние с темой по умолчанию — светлая
const initialState = {
  themeMode: 'light' as ThemeMode,
};

// Редьюсер для управления темой
export const appReducer = (
  state: typeof initialState = initialState,
  action: ActionsType
): typeof initialState => {
  switch (action.type) {
    case 'CHANGE_THEME':
      // Меняем тему на противоположную
      return { ...state, themeMode: action.payload };
    default:
      return state;
  }
};

// Action creator для изменения темы
export const changeThemeAC = (newTheme: ThemeMode) => {
  return { type: 'CHANGE_THEME', payload: newTheme };
};

// Типизация действий
type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;
type ActionsType = ChangeThemeActionType;
