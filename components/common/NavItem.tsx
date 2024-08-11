import Image from "next/image";

interface NavItemProps {
  src: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ src, text, isActive, onClick }) => (
  <li
    className="flex flex-col items-start cursor-pointer w-full"
    onClick={onClick}
  >
    <div className="flex gap-2">
      <Image src={src} alt={`${text} icon`} width={20} height={20} />
      <span
        className={isActive ? "text-black text-sm" : "text-gray-500 text-sm"}
      >
        {text}
      </span>
    </div>
    <div
      className={
        isActive
          ? "border-2 w-full border-black mt-2"
          : "border h-0 w-full mt-2"
      }
    ></div>
  </li>
);

export default NavItem;
