import { v1 } from 'uuid'; // Импортируем функцию генерации уникальных идентификаторов
import { TodolistType, FilterValuesType } from '../App'; // Импортируем необходимые типы

// Определяем начальное состояние
const initialState: TodolistType[] = [
  { id: v1(), title: 'What to learn', filter: 'all' },
  { id: v1(), title: 'What to buy', filter: 'all' },
];

// Типизация экшенов

// Тип для экшена удаления тудулиста
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  payload: {
    id: string;
  };
};

// Тип для экшена добавления тудулиста
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  payload: {
    id: string;
    title: string;
  };
};

// Тип для экшена изменения заголовка тудулиста
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  payload: {
    id: string;
    title: string;
  };
};

// Тип для экшена изменения фильтра тудулиста
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  payload: {
    id: string;
    filter: FilterValuesType;
  };
};

// Action creators

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const;
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', payload: { id: v1(), title } } as const;
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const;
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const;
};

// Общий тип для всех экшенов
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

// Редьюсер для управления состоянием тудулистов
export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      // Логика по удалению тудулиста
      // Фильтруем список тудулистов, исключая тудулист с id, указанным в экшене
      return state.filter((tl) => tl.id !== action.payload.id);
    }
    case 'ADD-TODOLIST': {
      // Логика по добавлению тудулиста
      // Создаем новый тудулист с данными из экшена
      const newTodolist: TodolistType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: 'all', // Устанавливаем фильтр по умолчанию
      };
      // Добавляем новый тудулист в состояние
      return [...state, newTodolist];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      // Логика по изменению заголовка тудулиста
      // Обновляем заголовок тудулиста, если его id совпадает с id из экшена
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl
      );
    }
    case 'CHANGE-TODOLIST-FILTER': {
      // Логика по изменению фильтра тудулиста
      // Обновляем фильтр тудулиста, если его id совпадает с id из экшена
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl
      );
    }
    default:
      // Возвращаем текущее состояние, если тип экшена не совпадает ни с одним из известных
      return state;
  }
};
