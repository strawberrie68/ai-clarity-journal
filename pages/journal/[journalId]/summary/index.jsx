import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import TabComponent from "@/components/common/TabComponent";

import "../../../../styles/global.css";

const Summary = () => {
  const [journal, setJournal] = useState({});
  const [haiku, setHaiku] = useState("");

  const formattedHaiku = haiku?.split(",").map((part, index) => (
    <p key={index}>
      {part.trim()}
      <br />
    </p>
  ));
  const router = useRouter();
  const { journalId } = router.query;

  const fetchJournal = async (journalId) => {
    const response = await fetch(
      `/api/users/6689d71d5b6990ef9ab9b498/journal/entries/${journalId}`
    );
    const data = await response.json();
    setJournal(data[0]);
  };

  useEffect(() => {
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
          <div
            className={`border rounded-xl px-4 py-4 flex flex-col justify-center bg-zinc-100`}
          >
            <h3 className="font-semibold text-sm text-neutral-400">
              ⭐️ Key Insight:
            </h3>
            <p className="mt-2 max-w-prose">{journal && journal.keyInsight}</p>
          </div>
          <div
            className={`border rounded-xl px-4 py-2 flex flex-col justify-center`}
          >
            <h3 className="font-semibold text-sm text-neutral-300">
              💭 Quote:
            </h3>
            <p className="mt-2 max-w-prose">{journal && journal.quote}</p>
          </div>
          <div
            className={`border rounded-xl px-4 py-2 flex flex-col justify-center`}
          >
            <h3 className="font-semibold text-sm text-neutral-300">
              🍦 Highlight:
            </h3>
            <p className="mt-2 max-w-prose">{journal && journal.highlight}</p>
          </div>
          <div
            className={`border rounded-xl px-4 py-2 flex flex-col justify-center`}
          >
            <h3 className="font-semibold text-sm text-neutral-300">
              🎨 Haiku:
            </h3>
            <div className="mt-2">{formattedHaiku}</div>
          </div>
        </section>
      ),
    },
    {
      key: "suggestions",
      label: "Suggestions",
      content: (
        <section>
          <ul className="mt-6 gap-4 flex flex-col">
            <li className="border rounded-xl px-4 py-2 flex items-center">
              <div className="flex basis-5/6 gap-4 items-center">
                <div className="w-10 h-10 flex justify-center items-center bg-amber-100 rounded-xl">
                  <p>🏃‍♀️</p>
                </div>
                <p>Drink only 3 cups of coffee</p>
              </div>
              <div className="basis-1/6 flex justify-end pr-4">
                <p className="text-xl text-sky-600">+</p>
              </div>
            </li>
            <li className="border rounded-xl px-4 py-2 flex items-center">
              <div className="flex basis-5/6 gap-4 items-center">
                <div className="w-10 h-10 flex justify-center items-center bg-amber-100 rounded-xl">
                  <p>🏃‍♀️</p>
                </div>
                <p>Drink only 3 cups of coffee</p>
              </div>
              <div className="basis-1/6 flex justify-end pr-4">
                <p className="text-xl text-sky-600">+</p>
              </div>
            </li>
          </ul>
        </section>
      ),
    },
  ];

  return (
    <section className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <h1 className="text-3xl font-bold mt-11">Summary</h1>
      <section className="w-full min-h-16 px-4 py-8 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
        <h2 className="text-lg font-semibold max-w-prose">{`${
          journal && journal.emoji
        } ${journal && journal.title}`}</h2>
        <p className="mt-2">{journal && journal.aiSummary}</p>
      </section>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Highlights</h3>
        <TabComponent tabs={tabs} />
      </div>
      <Link href={`/`}>
        <div className="mt-14">
          <Button buttonText="Done" isPrimary={true} />
        </div>
      </Link>
    </section>
  );
};

export default Summary;
