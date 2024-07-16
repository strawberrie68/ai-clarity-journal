"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const activeTabStyle = `flex bg-white rounded-full px-4 items-center gap-2 flex-col h-16 w-16 flexCenter`;
export const inactiveTabStyle = `flex items-center gap-2 flex-col`;
export const activeTextStyle = "text-black text-xs";
export const inactiveTextStyle = "text-white text-xs";

export const navLinks = [
  { id: 1, name: "Inbox", icon: `/calendar-dots`, path: "/" },
  { id: 2, name: "Explore", icon: `/explore`, path: "/explore" },
  { id: 3, name: "Add", icon: `/book`, path: "/pickJournal" },
  { id: 4, name: "Entries", icon: `/books`, path: "/journal/entries" },
  { id: 5, name: "Review", icon: `/review`, path: "/reviews" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  return (
    <div className="bottom-nav sticky mx-auto bottom-4 rounded-full h-20 bg-black  max-w-screen-sm sm:w-10/12 sm:px-12 px-8 content-center">
      <ul className="flex justify-between items-center">
        {navLinks.map((link) => {
          return (
            <li className="py-2" key={link.id}>
              <Link href={link.path}>
                <div
                  className={
                    isActive(link.path) ? activeTabStyle : inactiveTabStyle
                  }
                >
                  <Image
                    src={
                      isActive(link.path)
                        ? link.icon + ".svg"
                        : link.icon + "-white.svg"
                    }
                    alt={link.name}
                    width={24}
                    height={24}
                  />
                  <p
                    className={
                      isActive(link.path) ? activeTextStyle : inactiveTextStyle
                    }
                  >
                    {link.name}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BottomNav;
