import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

// Типы для пропсов компонента EditableSpan
type PropsType = {
  value: string; // Значение, которое будет отображаться и редактироваться
  onChange: (newValue: string) => void; // Функция для обработки изменения значения
  style?: React.CSSProperties; // Добавляем поддержку style
};

// Компонент EditableSpan
export const EditableSpan: React.FC<PropsType> = ({ value, onChange, style }) => {
  const [editMode, setEditMode] = useState<boolean>(false); // Состояние для управления режимом редактирования
  const [currentValue, setCurrentValue] = useState<string>(value); // Состояние для хранения текущего значения

  // Функция для активации режима редактирования
  const activateEditModeHandler = () => {
    setEditMode(true);
    setCurrentValue(value); // Устанавливаем текущее значение при входе в режим редактирования
  };

  // Функция для деактивации режима редактирования и сохранения нового значения
  const activateViewModeHandler = () => {
    setEditMode(false);
    onChange(currentValue); // Вызываем функцию onChange для сохранения нового значения
  };

  // Функция для обработки изменения значения в input
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value); // Обновляем текущее значение при изменении в input
  };

  return (
    <>
      {editMode ? (
        <TextField
          label="Enter a title"
          variant={'outlined'}
          value={currentValue} // Используем currentValue вместо title
          size={'small'}
          onChange={onChangeHandler} // Используем onChangeHandler вместо changeItemHandler
          onBlur={activateViewModeHandler} // Сохранение нового значения при выходе из поля ввода
          autoFocus // Автоматически фокусируем поле ввода при активации режима редактирования
          style={style} // Применяем стиль
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler} style={style}> {/* Применяем стиль */}
          {value}
        </span>
      )}
    </>
  );
};
