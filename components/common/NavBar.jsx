import "../../styles/global.css";

const NavBar = () => {
  const primaryButton = "bg-black text-white rounded-full h-11 px-12";
  const secondaryButton = " text-black h-11 px-12";
  return (
    <div className="w-full flex mt-6">
      <div>
        <div className={`${primaryButton} flexCenter`}>Today</div>
      </div>
      <div className="flex">
        <div className={`${secondaryButton} flexCenter`}>Tasks</div>
        <div className={`${secondaryButton} flexCenter`}>Habits</div>
      </div>
    </div>
  );
};

export default NavBar;
