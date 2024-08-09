import React, { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/common/BottomNav";
import Header from "@/components/common/Header";
import { formatDate } from "@/utils/formatUtils";
import Image from "next/image";
import "../../../styles/global.css";
import useAuth from "../../AuthContext.js";
const ToggleEntry = ({ date, journalId, journal }) => {
  const formattedDate = formatDate(date);
  return (
    <Link href={`/journal/${journalId}`}>
      <li className="flex gap-8 h-6 items-center hover:bg-gray-300 list-disc w-full">
        <p className="text-2xl">{journal && journal.emoji}</p>

        <div className="flex basis-auto min-w-48 items-center gap-8">
          <p className="text-stone-200 font-semibold text-sm ">
            {formattedDate}
          </p>
          <p className="line-clamp-2 mt-2 text-sm text-stone-700">
            {journal && journal.title}
          </p>
        </div>
      </li>
    </Link>
  );
};

const Entry = ({ date, journalId, journal }) => {
  const formattedDate = formatDate(date);

  return (
    <Link href={`/journal/${journalId}`}>
      <article className="flex gap-8 h-20 items-center">
        <div
          className="w-16 h-16 rounded-lg basis-20 shrink-0 flexCenter"
          style={{ backgroundColor: journal.color }}
        >
          <p className="text-2xl">{journal && journal.emoji}</p>
        </div>
        <div className="basis-auto min-w-48">
          <p className="text-stone-600 text-sm ">{formattedDate}</p>
          <p className="line-clamp-2 text-sm text-stone-700">
            {journal && journal.title}
          </p>
        </div>
      </article>
    </Link>
  );
};

const Entries = () => {
  const [journals, setJournals] = useState([]);
  const [groupedJournals, setGroupedJournals] = useState({});
  const [toggleState, setToggleState] = useState({});
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchJournals(userId);
    }
  }, [userId]);

  const fetchJournals = async (userId) => {
    const response = await fetch(`/api/users/${userId}/journals`);
    const data = await response.json();
    if (data.length > 0) {
      const sortedJournals = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 7);
      setJournals(sortedJournals);

      const grouped = data.reduce((acc, journal) => {
        if (journal.groupCreated) return acc;

        const date = new Date(journal.date);
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "short" });

        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = [];

        acc[year][month].push(journal);
        return acc;
      }, {});

      setGroupedJournals(grouped);
    } else {
      setJournals([]);
      setGroupedJournals({});
    }
  };

  const toggleVisibility = (year, month) => {
    setToggleState((prevState) => ({
      ...prevState,
      [year]: {
        ...prevState[year],
        [month]: !prevState[year]?.[month],
      },
    }));
  };

  return (
    <main className="mx-6 mt-10 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <h1 className="text-3xl font-bold mt-11">Journal Entries</h1>
      <section>
        <h2 className="font-semibold">This week</h2>
        <section className="mt-4 flex flex-col gap-4 min-h-48">
          {journals.length === 0 ? (
            <p>No entries yet</p>
          ) : (
            journals.map((journal) => (
              <Entry
                key={journal._id}
                date={journal.date}
                journalId={journal._id}
                journal={journal}
              />
            ))
          )}
        </section>
      </section>
      <section className="pb-10">
        <h2 className="font-semibold mt-8">Browse</h2>
        {Object.keys(groupedJournals).map((year) => (
          <div key={year}>
            <h3
              className="mt-4 font-medium cursor-pointer"
              onClick={() => toggleVisibility(year, null)}
            >
              {year}
            </h3>
            {Object.keys(groupedJournals[year]).map((month) => (
              <section key={month} className="mt-4 flex flex-col gap-4">
                <div
                  className="flex flex-col justify-between border rounded-xl w-full px-4 py-2  items-center cursor-pointer"
                  onClick={() => toggleVisibility(year, month)}
                >
                  <div className="flex justify-between w-full items-center">
                    <p className="font-bold">{month}</p>
                    <Image
                      src="/caret-down.svg"
                      alt="caret down"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="mt-8">
                    <ul>
                      {toggleState[year]?.[month] &&
                        groupedJournals[year][month].map((journal) => (
                          <li key={journal._id}>
                            <ToggleEntry
                              date={journal.date}
                              journalId={journal._id}
                              journal={journal}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ))}
      </section>
      <nav className="sticky bottom-6 w-full">
        <BottomNav />
      </nav>
    </main>
  );
};

export default Entries;
