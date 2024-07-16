import Image from "next/image";
import "../../styles/global.css";

const DailyCard = ({ subType, icon, title, handleClick }) => {
  return (
    <article
      className="min-h-36 flex flex-col flexCenter border rounded-lg bg-zinc-100 w-full"
      onClick={handleClick}
    >
      <span className="text-xs mb-4">{subType}</span>
      <Image src={icon} alt="Morning" width={24} height={24} />
      <span className="font-semibold text-md pt-4">{title}</span>
    </article>
  );
};

export default DailyCard;
