const Button = ({ buttonText, isPrimary, handleClick }) => {
  const buttonStyle = isPrimary ? "bg-black " : "";
  const textStyles = isPrimary ? "text-white" : "text-black";
  return (
    <button
      className={`${buttonStyle} h-9 w-full rounded-xl`}
      onClick={handleClick}
    >
      <p className={`${textStyles}`}>{buttonText}</p>
    </button>
  );
};

export default Button;
