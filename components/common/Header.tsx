import Image from "next/image";
import Link from "next/link";
import "../../styles/global.css";

interface HeaderProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ handleClick }) => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <button className="bg-zinc-100 h-11 w-11 rounded-full flexCenter" onClick={handleClick}>
          <Image src={`/back.svg`} alt="nav-bar" width={18} height={18} />
        </button>
      </Link>
      <div>
        <Image
          src="/user-profile.png"
          alt="user avatar"
          width={44}
          height={44}
        />
      </div>
    </header>
  );
};

export default Header;
