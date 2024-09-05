import { v1 } from 'uuid'; 
import { TodolistType, FilterValuesType } from './types';

// Экшен-криейторы
// Начальное состояние тудулистов, пустой массив
const initialTodolistsState: TodolistType[] = [];

// Экшен-криейторы для управления тудулистами
export const removeTodolistAC = (id: string) => ({
  type: 'REMOVE-TODOLIST',
  payload: { id }
});

export const addTodolistAC = (title: string) => ({
  type: 'ADD-TODOLIST',
  payload: { title, todolistId: v1() }
});

export const changeTodolistTitleAC = (id: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  payload: { id, title }
});

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  payload: { id, filter }
});

// Редьюсер для управления состоянием тудулистов
// Мы задаем начальное состояние по умолчанию как пустой массив `initialTodolistsState`
export const todolistsReducer = (
  state: TodolistType[] = initialTodolistsState, // Если не передано состояние, используем начальное значение
  action: any
): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      // Удаляем тудулист по id
      return state.filter(tl => tl.id !== action.payload.id);

    case 'ADD-TODOLIST':
      // Добавляем новый тудулист с заголовком и фильтром по умолчанию
      return [
        ...state, 
        { id: action.payload.todolistId, title: action.payload.title, filter: 'all' }
      ];

    case 'CHANGE-TODOLIST-TITLE':
      // Меняем заголовок тудулиста
      return state.map(tl => 
        tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl
      );

    case 'CHANGE-TODOLIST-FILTER':
      // Меняем фильтр задач в тудулисте
      return state.map(tl => 
        tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl
      );

    default:
      return state; // Возвращаем текущее состояние, если не распознали тип действия
  }
};