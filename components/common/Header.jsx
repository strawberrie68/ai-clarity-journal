import "../../styles/global.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const flexCenter = "flex justify-center items-center";
  return (
    <header className="flex justify-between">
      <Link href="/">
        <button className={`bg-zinc-100 h-16 w-16 rounded-full ${flexCenter}`}>
          <Image src={`/back.svg`} alt="nav-bar" width={24} height={24} />
        </button>
      </Link>
      <div>
        <Image
          src="/user-profile.png"
          alt="user avatar"
          width={66}
          height={66}
        />
      </div>
    </header>
  );
};

export default Header;
