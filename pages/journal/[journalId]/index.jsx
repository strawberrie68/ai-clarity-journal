import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "../../../components/common/Header";
import TabComponent from "@/components/common/TabComponent";
import BottomNav from "@/components/common/BottomNav";

import "../../../styles/global.css";

const PastEntry = () => {
  const formattedHaiku = (haiku) => {
    return haiku?.split(",").map((part, index) => (
      <p key={index}>
        {part.trim()}
        <br />
      </p>
    ));
  };

  const [journal, setJournal] = useState({});
  const router = useRouter();
  const { journalId } = router.query;

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await fetch(
        `/api/users/6689d71d5b6990ef9ab9b498/journal/entries/${journalId}`
      );
      const data = await response.json();
      setJournal(data[0]);
    };
    fetchJournal();
  }, [journalId]);

  const tabs = [
    {
      key: "summary",
      label: "Summary",
      content: (
        <div>
          <h2 className="text-xl mt-4 font-bold">Summary</h2>
          <section className="w-full min-h-16 px-4 py-8 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
            <h2 className="text-lg font-semibold max-w-prose">Overview</h2>
            <p>{journal && journal.aiSummary}</p>
          </section>
          <section className="mt-10 flex flex-col gap-4">
            <h3 className="text-xl font-bold">Highlights</h3>

            <div
              className={`border rounded-xl px-4 py-4 flex flex-col justify-center bg-zinc-100`}
            >
              <h3 className="font-semibold text-sm text-neutral-400">
                ⭐️ Key Insight:
              </h3>
              <p className="mt-2 max-w-prose">
                {journal && journal.keyInsight}
              </p>
            </div>
            <div
              className={`border rounded-xl px-4 py-2 flex flex-col justify-center`}
            >
              <h3 className="font-semibold text-sm text-neutral-300">
                😶 Mood:
              </h3>
              <div className="mt-2">{journal && journal.mood}</div>
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
              <div className="mt-2">
                {journal && formattedHaiku(journal.haiku)}
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      key: "entry",
      label: "Entry",
      content: (
        <div className="min-h-[580px] mt-8">
          <h2 className="text-xl mt-4 font-bold px-2">
            {`${journal && journal.emoji} 
              ${journal && journal.title}`}
          </h2>
          <div>
            {journal &&
              journal.entries?.map((entry) => (
                <div key={entry._id}>
                  <section className="w-full min-h-16 px-4 py-4 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
                    <p>{entry.content}</p>
                  </section>
                  <section className="w-full min-h-16 px-4 py-4 flex flex-col gap-4 rounded-lg border">
                    <p>{entry.aiResponse}</p>
                  </section>
                </div>
              ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="mx-6 mt-10 pb-4 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <div className="pt-6">
        <TabComponent tabs={tabs} />
      </div>
      <div className="">
        <BottomNav />
      </div>
    </section>
  );
};

export default PastEntry;
