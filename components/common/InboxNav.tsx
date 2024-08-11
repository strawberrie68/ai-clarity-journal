import React, { useState } from "react";
import NavItem from "./NavItem";
import InboxList from "./InboxList";

const InboxNav = () => {
  const [activeItem, setActiveItem] = useState("Habits");

  return (
    <>
      <nav className="inbox-nav overflow-auto">
        <ul className="flex justify-between items-center mt-4">
          <NavItem
            src="/calendar-blank.svg"
            text="Habits"
            isActive={activeItem === "Habits"}
            onClick={() => setActiveItem("Habits")}
          />
          <NavItem
            src="/calendar-dots.svg"
            text="Upcoming"
            isActive={activeItem === "Upcoming"}
            onClick={() => setActiveItem("Upcoming")}
          />
          <NavItem
            src="/arrow-circle-right.svg"
            text="Actions"
            isActive={activeItem === "Actions"}
            onClick={() => setActiveItem("Actions")}
          />
        </ul>
      </nav>
      <div className="min-h-24">
        {activeItem === "Habits" && <InboxList />}
        {activeItem === "Upcoming" && (
          <p className="py-4 px-2 text-gray-300">Empty right now.</p>
        )}
        {activeItem === "Actions" && (
          <p className="py-4 px-2 text-gray-300">Empty right now. </p>
        )}
      </div>
    </>
  );
};

export default InboxNav;
