import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store';
import { changeThemeAC } from './app/app-reducer';
import { getTheme } from './app/theme'; // Импортируем тему

export const Header = () => {
  // Получаем текущую тему из Redux
  const themeMode = useSelector<RootState, 'light' | 'dark'>((state) => state.app.themeMode);
  const dispatch = useDispatch();

  // Функция для смены темы
  const changeModeHandler = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    dispatch(changeThemeAC(newTheme));
  };

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Switch color="default" onChange={changeModeHandler} checked={themeMode === 'dark'} />
      </Toolbar>
    </AppBar>
  );
};
