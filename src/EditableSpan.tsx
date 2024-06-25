import React, { useState, ChangeEvent } from 'react';

type EditableSpanProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan: React.FC<EditableSpanProps> = ({ value, onChange }) => {
  const [editMode, setEditMode] = useState<boolean>(false); // Локальное состояние для режима редактирования
  const [currentValue, setCurrentValue] = useState<string>(value); // Локальное состояние для текущего значения

  const activateEditMode = () => {
    setEditMode(true); // Переключение в режим редактирования
    setCurrentValue(value); // Установка текущего значения
  };

  const activateViewMode = () => {
    setEditMode(false); // Переключение в режим просмотра
    onChange(currentValue); // Вызов функции onChange с новым значением
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value); // Обновление текущего значения при изменении в input
  };

  return (
    editMode ? 
      <input 
        value={currentValue} 
        onChange={changeTitle} 
        onBlur={activateViewMode} 
        autoFocus 
      /> 
    : 
      <span onDoubleClick={activateEditMode}>{value}</span>
  );
};
