import Image from "next/image";
const NavItem = ({ src, text }) => (
  <li>
    <div className="flex items-center gap-2">
      <Image src={src} alt={text} width={24} height={24} />
      <p>{text}</p>
    </div>
  </li>
);

const InboxNav = () => {
  return (
    <nav className="inbox-nav">
      <ul className="flex justify-between items-center mt-8">
        <NavItem src="/calendar-blank.svg" text="Habits" />
        <NavItem src="/calendar-dots.svg" text="Upcoming" />
        <NavItem src="/arrow-circle-right.svg" text="Next Actions" />
      </ul>
      <div className="border mt-4 flex w-auto h- relative">
        <div className="border-2 w-1/3 border-slate-950 absolute top-0 left-0"></div>
      </div>
    </nav>
  );
};

export default InboxNav;
