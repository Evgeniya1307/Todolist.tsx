type ButtonPropsType = {
  title: string;
  onClick?: () => void; // необязательное поле
  className?: string; // необязательное поле
};

export const Button: React.FC<ButtonPropsType> = ({ title, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};

