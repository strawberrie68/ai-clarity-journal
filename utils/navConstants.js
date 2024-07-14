export const activeTabStyle = `flex bg-white rounded-full px-4 items-center gap-2 flex-col h-16 w-16 flexCenter`;
export const inactiveTabStyle = `flex items-center gap-2 flex-col`;
export const activeTextStyle = "text-black text-xs";
export const inactiveTextStyle = "text-white text-xs";

export const navLinks = [
  { id: 1, name: "Inbox", icon: `/calendar-dots`, path: "/" },
  { id: 2, name: "Explore", icon: `/explore`, path: "/explore" },
  { id: 3, name: "Add", icon: `/book`, path: "/journal/add" },
  { id: 4, name: "Entries", icon: `/books`, path: "/journal/entries" },
  { id: 5, name: "Review", icon: `/review`, path: "/reviews" },
];
