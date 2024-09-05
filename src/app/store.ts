import { combineReducers, legacy_createStore } from 'redux';
import { tasksReducer } from '../model✳️/tasks-reducer'; // Импорт редьюсера для управления задачами
import { todolistsReducer } from '../model✳️/todolistsReducer'; // Импорт редьюсера для управления тудулистами
import { appReducer } from './app-reducer';
// Создание корневого редьюсера с использованием combineReducers
// combineReducers объединяет все редьюсеры в одно глобальное состояние (state)
const rootReducer = combineReducers({
  tasks: tasksReducer, // Управление задачами
  todolists: todolistsReducer, // Управление тудулистами
  app: appReducer,
});

// Создание Redux store с использованием legacy_createStore
// Store хранит глобальное состояние приложения и работает с редьюсерами для управления этим состоянием
export const store = legacy_createStore(rootReducer);

// Типизация состояния всего приложения
// Используем ReturnType, чтобы автоматически получить тип состояния из rootReducer
export type RootState = ReturnType<typeof store.getState>;


// Это позволяет получить доступ к store через глобальный объект window
// Это удобно для отладки и взаимодействия с состоянием приложения через консоль браузера
// @ts-ignore используется для того, чтобы избежать ошибок TypeScript, так как window не знает о store
window.store = store;
