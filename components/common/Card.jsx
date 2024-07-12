const Card = ({
  icon,
  text,
  background,
  secondaryBackground,
  textBackground,
}) => {
  const flexCenter = "flex justify-center items-center";
  return (
    <div
      className={`card h-44 min-w-40 ${background} rounded-2xl relative`}
    >
      <div
        className={`${textBackground} rounded-2xl absolute bottom-0 h-1/2 w-full z-10`}
      >
        <div
          className={`h-9 w-9 ${secondaryBackground} border-white border-2 rounded-lg ${flexCenter} ml-4 absolute -top-4`}
        >
          <img className="h-5" src={icon} alt={`${icon} icon`} />
        </div>
        <p className="font-semibold pt-7 pl-4 text-sm line-clamp-2">{text}</p>
      </div>
    </div>
  );
};

export default Card;
