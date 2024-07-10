const Header = () => {
  const flexCenter = "flex justify-center items-center";

  return (
    <header className="flex justify-between">
      <button className={`bg-zinc-100 h-16 w-16 rounded-full ${flexCenter}`}>
        <img src="/list.svg" alt="nav-bar" />
      </button>

      <div>
        <img src="/user-profile.png" />
      </div>
    </header>
  );
};

export default Header;
