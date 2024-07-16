import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "../pages/JournalContext";
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

const PickJournal = () => {
  const { setJournalPrompts } = useContext(JournalContext);
  const { push } = useRouter();
  const [selectedJournal, setSelectedJournal] = useState(null);
  const handleSelectedJournal = () => {
    const path = selectedJournal === "More" ? "/explore" : "/journal/add";
    push(path);
  };
  return (
    <article className="mx-6 mt-10 pb-8 lg:max-w-screen-lg lg:mx-auto">
      <Header />
      <h1 className="text-3xl font-bold mt-6">Pick a Journal</h1>
      <section className="mt-4 px-5 py-6 rounded-2xl bg-gradient-to-r from-lime-100 to-teal-100 flex flex-col">
        <h3 className="font-bold text-lg">💭 Pick a journal to start</h3>
        <p className="pt-4 text-sm max-w-prose">
          Choose a journal to start writing your thoughts and emotions. You can
          also explore our randomize for insightful prompts.
        </p>
      </section>
      <section className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <section className="mt-6 bottom-8 w-full">
        <Button
          buttonText="Select Journal"
          isPrimary={true}
          type="button"
          handleClick={handleSelectedJournal}
        />
      </section>
    </article>
  );
};

export default PickJournal;
