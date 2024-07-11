import "../../styles/global.css";
import Link from "next/link";
const Header = () => {
  const flexCenter = "flex justify-center items-center";
  return (
    <header className="flex justify-between">
      <Link href="/">
        <button className={`bg-zinc-100 h-16 w-16 rounded-full ${flexCenter}`}>
          <img src={`/back.svg`} alt="nav-bar" />
        </button>
      </Link>
      <div>
        <img src="/user-profile.png" alt="user avatar" />
      </div>
    </header>
  );
};

export default Header;
