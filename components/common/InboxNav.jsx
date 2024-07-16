import React, { act, useState } from "react";
import NavItem from "./NavItem";

const InboxNav = () => {
  return (
    <nav className="inbox-nav">
      <ul className="flex justify-between items-center mt-8">
        <NavItem src="/calendar-blank.svg" text="Habits" />
        <NavItem src="/calendar-dots.svg" text="Upcoming" />
        <NavItem src="/arrow-circle-right.svg" text="Next Actions" />
      </ul>
      <div className="mt-4 flex w-auto relative">
        <div className="border-2 w-1/4 border-slate-950"></div>
        <div className="border h-0 w-1/3 "></div>
        <div className="border h-0 w-1/3 "></div>
      </div>
    </nav>
  );
};

export default InboxNav;
