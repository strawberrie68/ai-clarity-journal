const Button = ({ buttonText, isPrimary, handleClick, type }) => {
  const buttonStyle = isPrimary
    ? "border border-black bg-white text-black hover:bg-black hover:text-white"
    : "text-gray-500 bg-transparent hover:text-black";

  return (
    <button
      className={`${buttonStyle} h-9 w-full rounded-xl flex items-center justify-center font-semibold`}
      onClick={handleClick}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default Button;
