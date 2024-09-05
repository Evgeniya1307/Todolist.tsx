// Тип для задачи
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
  };
  
  // Тип для тудулиста
  export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
  };
  
  // Тип для фильтра тудулистов (все, активные, выполненные)
  export type FilterValuesType = 'all' | 'active' | 'completed';
  
  // Тип для состояния задач, где ключ - это id тудулиста, а значение - массив задач
  export type TasksStateType = {
    [key: string]: TaskType[];
  };