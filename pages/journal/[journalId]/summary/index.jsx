import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../../../AuthContext.js";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import TabComponent from "@/components/common/TabComponent";
import { formattedHaiku } from "@/utils/formatUtils";

import "../../../../styles/global.css";

const Summary = () => {
  const [journal, setJournal] = useState({});
  const [haiku, setHaiku] = useState("");

  const router = useRouter();
  const { journalId } = router.query;
  const { userId } = useAuth();

  useEffect(() => {
    const fetchJournal = async (journalId) => {
      const response = await fetch(
        `/api/users/${userId}/journal/entries/${journalId}`
      );
      const data = await response.json();
      setJournal(data[0]);
    };

    if (journalId) {
      fetchJournal(journalId);
    }
  }, [journalId]);

  useEffect(() => {
    if (journal) {
      setHaiku(journal.haiku);
    }
  }, [journal]);

  const tabs = [
    {
      key: "keyPoints",
      label: "Key Points",
      content: (
        <section className="mt-8 flex flex-col gap-4">
          <KeyPoint title="⭐️ Key Insight:" content={journal?.keyInsight} />
          <KeyPoint title="💭 Quote:" content={journal?.quote} />
          <KeyPoint title="🍦 Highlight:" content={journal?.highlight} />
          <KeyPoint title="🎨 Haiku:" content={formattedHaiku(haiku)} />
        </section>
      ),
    },
    {
      key: "suggestions",
      label: "Suggestions",
      content: <SuggestionsList />,
    },
  ];

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <h1 className="text-3xl font-bold mt-11">Summary</h1>
      <SummarySection journal={journal} />
      <section className="mt-8">
        <h3 className="text-xl font-bold">Highlights</h3>
        <TabComponent tabs={tabs} />
      </section>
      <Link href={`/`}>
        <div className="mt-14">
          <Button buttonText="Done" isPrimary={true} />
        </div>
      </Link>
    </main>
  );
};

const KeyPoint = ({ title, content }) => (
  <div className="border rounded-xl px-4 py-2 flex flex-col justify-center">
    <h3 className="font-semibold text-sm text-neutral-300">{title}</h3>
    <p className="mt-2 max-w-prose">{content}</p>
  </div>
);

const SuggestionsList = () => (
  <section>
    <ul className="mt-6 gap-4 flex flex-col">
      {["Drink only 3 cups of coffee", "Exercise daily"].map(
        (suggestion, index) => (
          <li
            key={index}
            className="border rounded-xl px-4 py-2 flex items-center"
          >
            <div className="flex basis-5/6 gap-4 items-center">
              <div className="w-10 h-10 flex justify-center items-center bg-amber-100 rounded-xl">
                <span>🏃‍♀️</span>
              </div>
              <p>{suggestion}</p>
            </div>
            <div className="basis-1/6 flex justify-end pr-4">
              <p className="text-xl text-sky-600">+</p>
            </div>
          </li>
        )
      )}
    </ul>
  </section>
);

const SummarySection = ({ journal }) => (
  <section className="w-full min-h-16 px-4 py-8 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
    <h2 className="text-lg font-semibold max-w-prose">{`${journal?.emoji} ${journal?.title}`}</h2>
    <p className="mt-2">{journal?.aiSummary}</p>
  </section>
);

export default Summary;
