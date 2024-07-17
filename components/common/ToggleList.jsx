import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "../../pages/JournalContext";
import { dreamLife, productivity, procrastination, oneThing } from "../../data/journalPrompts";
import NavItem from "./NavItem";
import "../../styles/global.css";

const ToggleList = () => {
  const [activeItem, setActiveItem] = useState("All");
  const { push } = useRouter();
  const { setJournalPrompts } = useContext(JournalContext);

  const handleCardClick = (prompts) => {
    setJournalPrompts(prompts);
    push("/journal/add");
    console.log("prompts on toggleList", prompts);
  };
  return (
    <>
      <nav className="mt-4">
        <ul className="flex justify-start">
          <NavItem
            src="/calendar-blank.svg"
            text="All"
            isActive={activeItem === "All"}
            onClick={() => setActiveItem("All")}
          />
          <NavItem
            src="/calendar-dots.svg"
            text="Life"
            isActive={activeItem === "Life"}
            onClick={() => setActiveItem("Life")}
          />
          <NavItem
            src="/arrow-circle-right.svg"
            text="Productivity"
            isActive={activeItem === "Productivity"}
            onClick={() => setActiveItem("Productivity")}
          />
        </ul>
      </nav>
      <div className="min-h-24">
        {activeItem === "All" && (
          <section className="flex flex-col gap-2 mt-4">
            <div
              className="border rounded-lg px-2 py-3 hover:border-black"
              onClick={() => handleCardClick(dreamLife)}
            >
              <p>❤️ Find your passion</p>
            </div>
            <div
              className="border rounded-lg px-2 py-3 hover:border-black"
              onClick={() => handleCardClick(productivity)}
            >
              <p>✨ Be Productive</p>
            </div>
            <div
              className="border rounded-lg px-2 py-3 hover:border-black"
              onClick={() => handleCardClick(procrastination)}
            >
              <p>⏰ Procrastination</p>
            </div>
            <div
              className="border rounded-lg px-2 py-3 hover:border-black"
              onClick={() => handleCardClick(oneThing)}
            >
              <p>⭐️ Highlight</p>
            </div>
          </section>
        )}
        {activeItem === "Life" && (
          <p className="py-4 px-2 text-gray-300">Life</p>
        )}
        {activeItem === "Productivity" && (
          <p className="py-4 px-2 text-gray-300">Productivity</p>
        )}
      </div>
    </>
  );
};

export default ToggleList;
