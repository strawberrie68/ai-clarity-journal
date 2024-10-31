import Image from "next/image";
import Link from "next/link";
import ProfileNav from "./ProfileNav";
import "../../styles/global.css";

interface HeaderProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <button className="bg-zinc-100 h-11 w-11 rounded-full flexCenter">
          <Image src={`/back.svg`} alt="nav-bar" width={18} height={18} />
        </button>
      </Link>
      <div>
        <ProfileNav />
      </div>
    </header>
  );
};

export default Header;
