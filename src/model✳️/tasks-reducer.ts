import { v1 } from 'uuid'; 
import { TaskType, TasksStateType } from '../model✳️/types';

// Экшен для удаления задачи
export const removeTaskAC = (taskId: string, todolistId: string) => ({
  type: 'REMOVE-TASK',
  payload: { taskId, todolistId }
} as const);

// Экшен для добавления задачи
export const addTaskAC = (title: string, todolistId: string) => ({
  type: 'ADD-TASK',
  payload: { title, todolistId }
} as const);

// Экшен для изменения статуса задачи
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
  type: 'CHANGE-TASK-STATUS',
  payload: { taskId, isDone, todolistId }
} as const);

// Экшен для изменения заголовка задачи
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
  type: 'CHANGE-TASK-TITLE',
  payload: { taskId, newTitle, todolistId }
} as const);

// Типы экшенов для задач
type TaskActionsType = 
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | { type: 'ADD-TODOLIST'; payload: { todolistId: string } }
  | { type: 'REMOVE-TODOLIST'; payload: { todolistId: string } };

// Редьюсер для управления состоянием задач
export const initialTasksState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialTasksState, action: TaskActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
      };
    case 'ADD-TASK':
      const newTask: TaskType = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
      };
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
          task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task
        )
      };
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
          task.id === action.payload.taskId ? { ...task, title: action.payload.newTitle } : task
        )
      };
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.payload.todolistId]: []
      };
    case 'REMOVE-TODOLIST':
      const copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return copyState;
    default:
      return state; // Возвращаем текущее состояние по умолчанию
  }
};