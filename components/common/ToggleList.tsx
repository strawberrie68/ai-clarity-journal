import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "../../pages/JournalContext";
import {
  dreamLife,
  productivity,
  procrastination,
  oneThing,
  clarity, selfReflection, overcomingObstacles, mindfulness,
  avoiding
} from "../../data/journalPrompts";
import NavItem from "./NavItem";
import "../../styles/global.css";

const ToggleList = () => {
  const [activeItem, setActiveItem] = useState("All");
  const { push } = useRouter();
  const { setJournalPrompts } = useContext(JournalContext);

  const handleCardClick = (prompts: string[]) => {
    setJournalPrompts(prompts);
    push("/journal/add");
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
          <div>
            <p className="py-4 px-2 text-gray-300">All</p>
            <section className="flex flex-col gap-2">

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
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(clarity)}
              >
                <p>🧘‍♀️ Stressed and need clarity </p>
              </div>
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(selfReflection)}
              >
                <p>☀️ Reflect and Review</p>
              </div>
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(overcomingObstacles)}
              >
                <p>🏃‍♀️ Get unstuck </p>
              </div>
            </section>

          </div>
        )}
        {activeItem === "Life" && (
          <div>
            <p className="py-4 px-2 text-gray-300">Life</p>
            <section className="flex flex-col gap-2">
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(clarity)}
              >
                <p>🧘‍♀️ Stressed and need clarity </p>
              </div>
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(selfReflection)}
              >
                <p>☀️ Reflect and Review</p>
              </div>
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(overcomingObstacles)}
              >
                <p>🏃‍♀️ Get unstuck </p>
              </div>
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(mindfulness)}
              >
                <p>✨ Reset and be mindful</p>
              </div>
            </section>
          </div>

        )}
        {activeItem === "Productivity" && (
          <div>
            <p className="py-4 px-2 text-gray-300">Productivity</p>
            <section className="flex flex-col gap-2">
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(clarity)}
              >
                <p>🧘‍♀️ Stressed and need clarity </p>
              </div>
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(selfReflection)}
              >
                <p>☀️ Reflect and Review</p>
              </div>
              <div
                className="border rounded-lg px-2 py-3 hover:border-black"
                onClick={() => handleCardClick(avoiding)}
              >
                <p>🏃‍♀️ Just do it</p>
              </div>

            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default ToggleList;
