import BottomNav from "@/components/common/BottomNav";
import Header from "@/components/common/Header";
import "../../../styles/global.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Entry = ({ date, journalId }) => {
  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", options);
  };

  const flexCenter = "flex justify-center items-center";
  const formattedDate = formatDate(date);

  return (
    <Link href={`/journal/${journalId}`}>
      <div className="flex gap-8">
        <div className={`bg-amber-100 w-16 h-16 rounded-lg ${flexCenter}`}>
          {/*TODO: need to get the emoji */}
          <p className="text-2xl">🏃‍♀️</p>
        </div>
        <div className="">
          <p className="text-stone-200 font-semibold text-sm">
            {formattedDate}
          </p>
          <p className="clamp-1 mt-2">
            {/* TODO: need to get journal title */}
            Today is the best day ever I got ice cream
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
      setJournals(data);
    };
    fetchJournals();
  }, []);

  console.log(journals);
  return (
    <section className="mx-6 mt-10 ">
      <Header />
      <h1 className="text-3xl font-bold my-11">Journal Entries</h1>
      <section>
        <h2 className="font-semibold">This week</h2>
        <section className="mt-4 flex flex-col gap-4">
          {journals &&
            journals.map((journal) => (
              <Entry
                key={journal.id}
                date={journal.date}
                journalId={journal._id}
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
      <BottomNav />
    </section>
  );
};

export default Entries;
