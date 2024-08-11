interface ButtonProps {
  buttonText: string | JSX.Element;
  buttonType: "primary" | "secondary" | "primary-2";
  type: "button" | "submit";
  disabled: boolean;
  handleClick: () => void;
}

const ButtonCopy: React.FC<ButtonProps> = ({
  buttonText,
  buttonType,
  handleClick,
  type,
  disabled,
}) => {
  const buttonStyle2 = {
    primary: "rounded-3xl bg-black text-white button-shadow font-semibold",
    secondary: "border text-gray-700 bg-white border-gray-300 hover:bg-lt-gray rounded-3xl",
    "primary-2": "bg-lt-gray text-black font-medium",
  };

  return (
    <button
      className={`${buttonStyle2[buttonType]} h-14 w-full rounded-3xl flex items-center justify-center`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default ButtonCopy;
