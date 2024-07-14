"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  activeTabStyle,
  inactiveTabStyle,
  activeTextStyle,
  inactiveTextStyle,
  navLinks,
} from "@/utils/navConstants";

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
                    width={20}
                    height={20}
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
