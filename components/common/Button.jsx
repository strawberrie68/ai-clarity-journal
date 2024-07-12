const Button = ({ buttonText, isPrimary, handleClick, type }) => {
  const buttonStyle = isPrimary ? "border border-black" : "";
  const textStyles = isPrimary ? "text-black font-bold" : "text-gray-500";
  return (
    <button
      className={`${buttonStyle} h-9 w-full rounded-xl`}
      onClick={handleClick}
      type={type}
    >
      <p className={`${textStyles}`}>{buttonText}</p>
    </button>
  );
};

export default Button;
