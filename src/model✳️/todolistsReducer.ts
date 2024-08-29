import { v1 } from 'uuid'; 
import { TodolistType, FilterValuesType } from '../App'; 

// Экшены для тудулистов
export const addTodolistAC = (title: string) => ({
  type: 'ADD-TODOLIST',
  payload: { title, todolistId: v1() }
} as const);

export const removeTodolistAC = (todolistId: string) => ({
  type: 'REMOVE-TODOLIST',
  payload: { todolistId }
} as const);

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  payload: { todolistId, filter }
} as const);

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  payload: { todolistId, title }
} as const);

// Типизация экшенов для тудулистов
export type ActionsType = 
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>;

// Редьюсер для тудулистов
export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'ADD-TODOLIST':
      const newTodolist: TodolistType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
      };
      return [...state, newTodolist];

    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.payload.todolistId);

    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => 
        tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl
      );

    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => 
        tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl
      );

    default:
      return state;
  }
};
