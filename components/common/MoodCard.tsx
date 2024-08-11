import React from "react";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/utils/formatUtils";

interface MoodCardProps {
  mood: string;
  handleClick: () => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ mood, handleClick }) => (
  <button
    className="flex-col flex flexCenter cursor-pointer"
    onClick={handleClick}
  >
    <div className="w-16 h-16 border hover:border-black rounded-xl flexCenter">
      <Image
        src={`/smiley-${mood}.svg`}
        alt={`${mood} mood emoji`}
        width={24}
        height={24}
      />
    </div>
    <span className="mt-2">{capitalizeFirstLetter(mood)}</span>
  </button>
);

export default MoodCard;
