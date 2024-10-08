import Image from "next/image";

interface CardProps {
  icon: string;
  text: string;
  background: string;
  secondaryBackground: string;
  textBackground: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  text,
  background,
  secondaryBackground,
  textBackground,
}) => {
  return (
    <article
      className={`card h-44 min-w-40 ${background} rounded-2xl relative`}
    >
      <div
        className={`${textBackground} rounded-2xl absolute bottom-0 h-1/2 w-full z-10`}
      >
        <div
          className={`h-9 w-9 ${secondaryBackground} border-white border-2 rounded-lg flexCenter ml-4 absolute -top-4`}
        >
          <Image src={icon} alt={`${icon} icon`} width={20} height={20} />
        </div>
        <p className="font-semibold pt-7 pl-4 text-sm line-clamp-2">{text}</p>
      </div>
    </article>
  );
};

export default Card;
