import React from 'react';
import MuiButton from '@mui/material/Button';

type ButtonPropsType = {
  title: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained'; // Добавлено свойство variant
  color?: 'inherit' | 'primary' | 'secondary'; // Добавлено свойство color
};

export const Button: React.FC<ButtonPropsType> = ({ title, onClick, variant = 'text', color = 'inherit' }) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick}>
      {title}
    </MuiButton>
  );
};