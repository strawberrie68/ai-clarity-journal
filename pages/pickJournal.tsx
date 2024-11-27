import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "./JournalContext";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import JournalCard from "@/components/common/JournalCard";
import { getCurrentTimePeriod } from "@/utils/formatUtils";
import { randomizePrompts } from "@/utils/randomizePrompts";
import "../styles/global.css";
import {
  sad,
  random,
  morningDaily,
  gratitudeDaily,
  eveningDaily,
  productivity,
} from "@/data/journalPrompts";
import BottomNav from "@/components/common/BottomNav"

const PickJournal = () => {
  const { setJournalPrompts } = useContext(JournalContext);
  const { push } = useRouter();
  const timePeriod = getCurrentTimePeriod();
  const isMorning = timePeriod === "morning";
  const [selectedJournal, setSelectedJournal] = useState<string | null>(null);

  const handleCardPick = (prompts: string[] | null, label: string | null) => {
    if (label === "Random") {
      const randomPromptsList = randomizePrompts(random);
      setJournalPrompts(randomPromptsList);
    } else {
      setJournalPrompts(prompts);
    }
    setSelectedJournal(label);
  };

  const handleSelectedJournal = () => {
    const path = selectedJournal === "More" ? "/explore" : "/journal/add";
    push(path);
  };
  const router = useRouter();
  return (
    <article className="mx-6 mt-10 pb-8 lg:max-w-screen-lg lg:mx-auto">
      <Header handleClick={() => router.push("/")} />
      <h1 className="text-3xl font-bold mt-6">Pick a Journal</h1>
      <section className="mt-4 px-5 py-6 rounded-2xl bg-gradient-to-r from-lime-100 to-teal-100 flex flex-col">
        <h3 className="font-bold text-lg">💭 Pick a journal to start</h3>
        <p className="pt-4 text-sm max-w-prose">
          Choose a journal to start writing your thoughts and emotions. You can
          also explore our randomize for insightful prompts.
        </p>
      </section>
      <section className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isMorning ? (
          <JournalCard
            src="/sun.svg"
            alt="morning icon"
            label="Morning"
            onClick={() => handleCardPick(morningDaily, "Morning")}
            selected={selectedJournal === "Morning"}
          />
        ) : (
          <JournalCard
            src="/moon-stars.svg"
            alt="night icon"
            label="Night"
            onClick={() => handleCardPick(eveningDaily, "Night")}
            selected={selectedJournal === "Night"}
          />
        )}

        <JournalCard
          src="/heart.svg"
          alt="gratitude icon"
          label="Gratitude"
          onClick={() => handleCardPick(gratitudeDaily, "Gratitude")}
          selected={selectedJournal === "Gratitude"}
        />
        <JournalCard
          src="/calendar-dots.svg"
          alt="productivity icon"
          label="Productivity"
          onClick={() => handleCardPick(productivity, "Productivity")}
          selected={selectedJournal === "Productivity"}
        />
        <JournalCard
          src="/bad day.svg"
          alt="bad day journal icon"
          label="Bad Day"
          onClick={() => handleCardPick(sad, "Bad Day")}
          selected={selectedJournal === "Bad Day"}
        />
        <JournalCard
          src="/rocket.svg"
          alt="random journal icon"
          label="Random"
          selected={selectedJournal === "Random"}
          onClick={() => handleCardPick(null, "Random")}
        />
        <JournalCard
          src="/explore.svg"
          alt="more journal icon"
          label="More"
          selected={selectedJournal === "More"}
          onClick={() => handleCardPick(morningDaily, "More")}
        />
      </section>
      <section className="mt-6 bottom-8 w-full">
        <Button
          buttonText="Select Journal"
          isPrimary={true}
          type="button"
          handleClick={handleSelectedJournal}
          disabled={false}
        />
      </section>
      <nav className="fixed w-full mx-auto px-4 bottom-4 left-0 lg:bottom-6">
        <BottomNav />
      </nav>
    </article>
  );
};

export default PickJournal;
