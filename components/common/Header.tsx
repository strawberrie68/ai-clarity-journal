import Image from "next/image";
import Link from "next/link";
import "../../styles/global.css";



const Header = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">
        <button className="bg-zinc-100 h-11 w-11 rounded-full flexCenter">
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
