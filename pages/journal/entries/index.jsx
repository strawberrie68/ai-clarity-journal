import BottomNav from "@/components/common/BottomNav";
import Header from "@/components/common/Header";
import "../../../styles/global.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Entry = ({ date, journalId, journal }) => {
  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", options);
  };

  const flexCenter = "flex justify-center items-center";
  const formattedDate = formatDate(date);

  return (
    <Link href={`/journal/${journalId}`}>
      <div className="flex gap-8 h-20">
        <div
          className={`min-w-10 min-h-10 rounded-lg aspect-square basis-18 ${flexCenter}`}
          style={{ backgroundColor: journal.color }}
        >
          <p className="text-2xl">{journal && journal.emoji}</p>
        </div>
        <div className="flex-grow">
          <p className="text-stone-200 font-semibold text-sm ">
            {formattedDate}
          </p>
          <p className="clamp-1 mt-4 text-sm text-stone-700">
            {journal && journal.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Entries = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const response = await fetch(
        `/api/users/6689d71d5b6990ef9ab9b498/journals`
      );
      const data = await response.json();
      if (data.length > 0) {
        const sortedJournals = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 7);
        setJournals(sortedJournals);
      } else {
        setJournals([]);
      }
    };
    fetchJournals();
  }, []);

  return (
    <section className="mx-6 mt-10 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <h1 className="text-3xl font-bold mt-11">Journal Entries</h1>
      <section>
        <h2 className="font-semibold">This week</h2>
        <section className="mt-4 flex flex-col gap-4 min-h-48">
          {journals.length === 0 && <p>No entries yet</p>}
          {journals &&
            journals.map((journal) => (
              <Entry
                key={journal._id}
                date={journal.date}
                journalId={journal._id}
                journal={journal}
              />
            ))}
        </section>
      </section>
      <section className="pb-4">
        <h2 className="font-semibold mt-8">Browse</h2>
        <h3 className="mt-4 font-medium">2024</h3>
        <section className="mt-4 flex flex-col gap-4">
          <div className="border rounded-xl w-full h-16 px-4 py-2 flex justify-start items-center">
            <p className="font-bold">Jun</p>
          </div>
          <div className="border rounded-xl w-full h-16 px-4 py-2 flex justify-start items-center">
            <p className="font-bold">May</p>
          </div>
          <div className="border rounded-xl w-full h-16 px-4 py-2 flex justify-start items-center">
            <p className="font-bold">Apr</p>
          </div>
        </section>
      </section>
      <div className="sticky bottom-2 w-full">
        <BottomNav />
      </div>
    </section>
  );
};

export default Entries;
