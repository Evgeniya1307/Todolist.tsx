//чтобы переиспользовать
//будет и новый тудулист добавлять и добавлять таску

import { ChangeEvent, KeyboardEvent, useState } from 'react' 
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'; // Импортирую TextField
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
// Определение типа пропсов для компонента AddItemForm
type PropsType = {
  addItem: (title: string) => void // Функция addItem принимает строку и ничего не возвращает
}

export const AddItemForm = ({ addItem }: PropsType) => {
  // Определение состояния для хранения значения ввода
  const [title, setTitle] = useState('') // Начальное состояние пустая строка
  // Определение состояния для хранения ошибки
  const [error, setError] = useState<string | null>(null) // Начальное состояние null

  // Обработчик нажатия кнопки для добавления элемента
  const addItemHandler = () => {
    if (title.trim() !== '') { // Проверка, что строка не пустая после обрезки пробелов
      addItem(title.trim()) // Вызов функции addItem с очищенным значением title
      setTitle('') // Очистка поля ввода
    } else {
      setError('Title is required') // Установка ошибки, если поле ввода пустое
    }
  }

  // Обработчик изменения значения в поле ввода
  const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value) // Обновление состояния title текущим значением из поля ввода
  }

  // Обработчик нажатия клавиши в поле ввода
  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null) // Сброс ошибки
    if (event.key === 'Enter') { // Проверка, была ли нажата клавиша Enter
      addItemHandler() // Вызов функции добавления элемента
    }
  }

  return (
    <div>
      <TextField
  label="Enter a title"
  variant={'outlined'}
  className={error ? 'error' : ''}
  value={title}
  size={'small'}
  onChange={changeItemHandler}
  onKeyUp={addItemOnKeyUpHandler}
/>
<IconButton onClick={addItemHandler} color={'primary'}>
        <AddBoxIcon />
      </IconButton> {/* Кнопка для добавления элемента, обработчик нажатия */}
      {error && <div className={'error-message'}>{error}</div>} {/* Отображение сообщения об ошибке при её наличии */}
    </div>
  )
}
