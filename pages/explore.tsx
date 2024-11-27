import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "./JournalContext";
import { getCurrentTimePeriod } from "@/utils/formatUtils";
import {
  sad,
  nervous,
  happy,
  curious,
  angry,
  morningDaily,
  gratitudeDaily,
  eveningDaily,
} from "@/data/journalPrompts";
import BottomNav from "@/components/common/BottomNav";
import DailyCard from "@/components/common/DailyCard";
import Header from "@/components/common/Header";
import MoodCard from "@/components/common/MoodCard";
import TabComponent from "@/components/common/TabComponent";
import ToggleList from "@/components/common/ToggleList";
import "../styles/global.css";

type JournalPrompt = string[];

const journalPrompts: Record<string, JournalPrompt> = {
  happy,
  curious,
  nervous,
  sad,
  angry,
};

const Explore: React.FC = () => {
  const timePeriod = getCurrentTimePeriod();
  const isMorning = timePeriod === "morning";
  const { setJournalPrompts } = useContext(JournalContext);
  const { push } = useRouter();

  const handleCardClick = (prompts: string[]) => {
    setJournalPrompts(prompts);
    push("/journal/add");
  };

  const dailyTabContent = (
    <section className="mt-6 flex overflow-auto gap-4">
      {isMorning ? (
        <DailyCard
          icon="/sun.svg"
          subType="Daily"
          title="Morning"
          handleClick={() => handleCardClick(morningDaily)}
        />
      ) : (
        <DailyCard
          icon="/moon-stars.svg"
          subType="Daily"
          title="Night"
          handleClick={() => handleCardClick(eveningDaily)}
        />
      )}

      <DailyCard
        icon="/heart.svg"
        subType="Daily"
        title="Gratitude"
        handleClick={() => handleCardClick(gratitudeDaily)}
      />
    </section>
  );

  const tabs = [
    {
      key: "daily",
      label: "Daily",
      content: dailyTabContent,
    },
    // TODO: ADD prompts for user favorites
    // { key: "favorites", label: "Favorites", content: <div>Favorites</div> },
    // { key: "suggestion", label: "Suggestions", content: <div>Suggestion</div> },
  ];
  const router = useRouter();
  return (
    <div className="mx-6 mt-10 pb-8 lg:max-w-screen-lg lg:mx-auto">
      <Header handleClick={() => router.back} />
      <h1 className="text-3xl font-bold mt-11">Explore</h1>
      <section className="mt-4 ">
        <section className="mt-2 px-5 py-6 rounded-lg bg-gradient-to-r from-lime-50 to-teal-50 flex flex-col">
          <h3 className="font-bold ">💭 Where to start?</h3>
          {/* TODO make an ai to pick the best prompt for user */}
          {/* <p className="pt-2 text-sm">
            Try our ai that will match the prefect journal prompt for what your
            feeling
          </p>
          <div className="border w-24 px-2 border-black rounded-full mt-5 flexCenter">
            Try AI
          </div> */}
          <p className="pt-2 text-sm">
            Not sure where to start? Why not try our daily prompts!
          </p>

        </section>
        <div>
          <div className="mt-4 overflow-auto">
            <TabComponent tabs={tabs} />
          </div>
          <section className="h-full mt-10 gap-4">
            <h2 className="text-xl font-bold">Moods</h2>
            <section className="flex justify-between gap-4 mt-2 overflow-auto lg:justify-normal lg:gap-10">
              {Object.keys(journalPrompts).map((mood) => (
                <MoodCard
                  key={mood}
                  mood={mood}
                  handleClick={() => handleCardClick(journalPrompts[mood])}
                />
              ))}
            </section>
          </section>
        </div>
      </section>
      <section className="mt-10 pb-20">
        <h2 className="text-xl font-bold">Explore</h2>
        <ToggleList />
      </section>
      <nav className="fixed w-full mx-auto px-4 bottom-4 left-0 lg:bottom-6">
        <BottomNav />
      </nav>
    </div>
  );
};
export default Explore;
