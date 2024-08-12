interface ButtonProps {
  buttonText: string;
  isPrimary: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
  type: "button" | "submit";
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonText, isPrimary, handleClick, type, disabled }) => {
  const buttonStyle = isPrimary
    ? "border border-black bg-white text-black hover:bg-black hover:text-white"
    : "text-gray-500 bg-white hover:text-black";
  return (
    <button
      className={`${buttonStyle} h-9 w-full rounded-xl flex items-center justify-center font-semibold`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;
