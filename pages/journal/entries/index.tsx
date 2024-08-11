import React, { useEffect, useState } from "react";
import Image from "next/image";
import BottomNav from "@/components/common/BottomNav";
import Header from "@/components/common/Header";
import { useAuth } from "../../AuthContext.js";
import axios from 'axios';
import ToggleEntry from "@/components/common/ToggleEntry";
import Entry from "@/components/common/Entry";
import "../../../styles/global.css";

interface Entry {
  aiResponse: string;
  content: string;
}

interface Journal {
  _id: string;
  title?: string;
  emoji?: string;
  color?: string;
  date: string;
}


interface GroupedJournals {
  [year: string]: {
    [month: string]: Journal[];
  };
}

interface ToggleState {
  [year: string]: {
    [month: string]: boolean;
  };
}

const Entries: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [groupedJournals, setGroupedJournals] = useState<GroupedJournals>({});
  const [toggleState, setToggleState] = useState<ToggleState>({});
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchJournals(userId);
    }
  }, [userId]);

  const fetchJournals = async (userId: string) => {
    const response = await axios.get(`/api/users/${userId}/journals`);
    const data: Journal[] = response.data;
    if (data.length > 0) {
      const sortedJournals = data
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7);
      setJournals(sortedJournals);

      const grouped = data.reduce((acc: GroupedJournals, journal) => {
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

  const toggleVisibility = (year: string, month: string | null) => {
    setToggleState((prevState) => ({
      ...prevState,
      [year]: {
        ...prevState[year],
        ...(month && { [month]: !prevState[year]?.[month] }),
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
                  className={`flex ${toggleState[year]?.[month] ? "flex-col" : ""
                    } border rounded-xl w-full px-4 py-4 h-auto cursor-pointer`}
                  onClick={() => toggleVisibility(year, month)}
                >
                  <div className={`flex justify-between w-full items-center`}>
                    <p className="font-bold">{month}</p>
                    <Image
                      src="/caret-down.svg"
                      alt="caret down"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="mt-4">
                    {toggleState[year]?.[month] &&
                      groupedJournals[year][month].map((journal) => (
                        <ToggleEntry
                          date={journal.date}
                          journalId={journal._id}
                          journal={journal}
                          key={journal._id}
                        />
                      ))}
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
