import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.js";
import axios from 'axios';
import Header from "../../../components/common/Header";
import TabComponent from "@/components/common/TabComponent";
import BottomNav from "@/components/common/BottomNav";
import { formatDate, formattedHaiku } from "@/utils/formatUtils";
import "../../../styles/global.css";

interface Journal {
  keyInsight?: string;
  quote?: string;
  aiSummary?: string;
  color?: string;
  conversationSummary?: string;
  emoji?: string;
  haiku?: string;
  highlight?: string;
  mood?: string;
  sentiment?: string;
  title?: string;
  user: string;
  entries: Entry[];
  date: string;
}

interface Entry {
  aiResponse: string;
  content: string;
  _id: string;
}

interface Tab {
  key: string;
  label: string;
  content: JSX.Element;
}

const PastEntry: React.FC = () => {
  const [journal, setJournal] = useState<Journal | null>(null);
  const router = useRouter();
  const { journalId } = router.query as { journalId: string }; // Adding type assertion
  const { userId } = useAuth();

  function formatJournalEntry(entry: string): JSX.Element[] {
    entry = entry.replace(/:/g, ":<br/>");
    entry = entry.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, "<br/><br/>$1");
    const lines = entry.split("\n");
    const formattedLines = lines.map((line, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
    ));
    return formattedLines;
  }

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await axios.get(
        `/api/users/${userId}/journal/entries/${journalId}`
      );
      const data: Journal[] = response.data;
      setJournal(data[0]);
    };
    fetchJournal();
  }, [journalId, userId]);

  const tabs: Tab[] = [
    {
      key: "summary",
      label: "Summary",
      content: (
        <div>
          <h2 className="text-md mt-10 font-bold mb-2 text-gray-500">
            {journal && formatDate(journal.date)}
          </h2>
          <section className="w-full min-h-16 px-4 py-8 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100">
            <h2 className="text-lg font-semibold max-w-prose">
              {`${journal?.emoji || ""} ${journal?.title || ""}`}
            </h2>
            <p className="max-w-prose mt-2">{journal?.aiSummary}</p>
          </section>
          <section className="mt-8 flex flex-col gap-4">
            <h3 className="text-md font-semibold text-gray-500">Highlights</h3>

            <div className="border rounded-xl px-4 py-4 flex flex-col justify-center bg-zinc-100">
              <h3 className="font-semibold text-sm text-neutral-400">
                ⭐️ Key Insight:
              </h3>
              <p className="mt-2 max-w-prose">
                {journal?.keyInsight}
              </p>
            </div>
            <div className="border rounded-xl px-4 py-2 flex flex-col justify-center">
              <h3 className="font-semibold text-sm text-neutral-300">
                😶 Mood:
              </h3>
              <div className="mt-2">{journal?.mood}</div>
            </div>

            <div className="border rounded-xl px-4 py-2 flex flex-col justify-center">
              <h3 className="font-semibold text-sm text-neutral-300">
                💭 Quote:
              </h3>
              <p className="mt-2 max-w-prose">{journal?.quote}</p>
            </div>
            <div className="border rounded-xl px-4 py-2 flex flex-col justify-center">
              <h3 className="font-semibold text-sm text-neutral-300">
                🍦 Highlight:
              </h3>
              <p className="mt-2 max-w-prose">{journal?.highlight}</p>
            </div>
            <div className="border rounded-xl px-4 py-2 flex flex-col justify-center">
              <h3 className="font-semibold text-sm text-neutral-300">
                🎨 Haiku:
              </h3>
              <div className="mt-2">
                {journal && formattedHaiku(journal.haiku || "")}
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
          <h2 className="text-md mt-10 font-bold mb-2 text-gray-500">
            {journal && formatDate(journal.date)}
          </h2>
          <div>
            {journal &&
              journal.entries.map((entry) => (
                <div key={entry._id}>
                  <section className="w-full min-h-16 px-4 py-8 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100">
                    <h2 className="text-lg font-semibold max-w-prose pb-4">
                      {`${journal.emoji} ${journal.title}`}
                    </h2>
                    {formatJournalEntry(entry.content)}
                  </section>
                  <section className="w-full min-h-16 mt-4 px-4 py-4 flex flex-col gap-4 rounded-lg border">
                    <p className="max-w-prose">{entry.aiResponse}</p>
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
      <div className="pt-6">
        <BottomNav />
      </div>
    </section>
  );
};

export default PastEntry;
