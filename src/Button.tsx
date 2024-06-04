type ButtonPropsType = {
  title: string;
  onClick?: () => void;//необязательное поле (указанное с помощью знака вопроса ?)
};

export const Button = ({ title, onClick }: ButtonPropsType) => {
  return <button onClick={onClick}>{title}</button>;
};
