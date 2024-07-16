import Image from "next/image";
import Link from "next/link";
import "../../styles/global.css";

const Header = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <button className="bg-zinc-100 h-10 w-10 rounded-full flexCenter">
          <Image src={`/back.svg`} alt="nav-bar" width={18} height={18} />
        </button>
      </Link>
      <div>
        <Image
          src="/user-profile.png"
          alt="user avatar"
          width={40}
          height={40}
        />
      </div>
    </header>
  );
};

export default Header;
