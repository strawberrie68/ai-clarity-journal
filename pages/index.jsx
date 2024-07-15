import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import NavBar from "@/components/common/NavBar";
import Card from "@/components/common/Card";
import InboxNav from "@/components/common/InboxNav";
import InboxList from "@/components/common/InboxList";
import BottomNav from "@/components/common/BottomNav";
import { formatQuote } from "@/utils/formatUtils";

import "../styles/global.css";

export default function Home() {
  const flexCenter = "flex justify-center items-center";
  const [journal, setJournal] = useState([]);

  const fetchLatestJournal = async () => {
    const response = await fetch(
      `/api/users/6689d71d5b6990ef9ab9b498/journals`
    );
    const data = await response.json();
    if (data.length > 0) {
      const sortedJournals = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 7);
      setJournal(sortedJournals[0]);
    } else {
      setJournal([]);
    }
  };

  useEffect(() => {
    fetchLatestJournal();
  }, []);

  return (
    <div className="mx-6 mt-10 pb-8">
      <div className="flex justify-between lg:max-w-screen-lg lg:mx-auto">
        <div className="">
          <button
            className={`bg-zinc-100 h-16 w-16 rounded-full ${flexCenter}`}
          >
            <Image src="/list.svg" alt="nav-bar" width={28} height={28} />
          </button>
          <div className="mt-16">
            <p className="text-6xl font-bold">Hello,</p>
            <p className="text-6xl font-bold">Michelle</p>
          </div>
        </div>
        <div>
          <Image
            src="/user-profile.png"
            alt="user profile"
            width={66}
            height={66}
          />
        </div>
      </div>
      <div className="lg:max-w-screen-lg lg:mx-auto">
        <NavBar />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:max-w-screen-lg lg:mx-auto lg:gap-8">
        <div className="flex lg:flex-col gap-4 overflow-scroll lg:overflow-x-auto lg:basis-3/5">
          <div className="mt-10 flex gap-4 ">
            <Link href="/journal/add">
              <Card
                text="Enter Your Daily Journal"
                icon="/book-white.svg"
                secondaryBackground="bg-[#D3AC1E]"
                background="bg-[#F0E2AE]"
                textBackground="bg-white/50"
              />
            </Link>
            <Card
              text="Tips: Everyday is a good day to start"
              icon="/lightbulb.svg"
              secondaryBackground="bg-[#D3AC1E]"
              background="bg-gradient-to-br from-lime-200 to-pink-400"
              textBackground="bg-white/70"
            />
            <Card
              text={
                journal
                  ? journal.keyInsight
                  : "Tips: Everyday is a good day to start"
              }
              icon="/lightbulb.svg"
              secondaryBackground="bg-[#D3AC1E]"
              background="bg-lime-100"
              textBackground="bg-[#f0f0f0]"
            />
          </div>
          <div className="mt-10 lg:mt-0">
            <div
              className={`h-44 min-w-40  max-w-lg rounded-2xl relative bg-gray-100 px-4 py-4 ${flexCenter}`}
            >
              <div className="text-gray-400 max-w-">
                {!journal && (
                  <p>Excitement is a better motivator than discipline.</p>
                )}
                <p className="line-clamp-4">
                  {journal && formatQuote(journal.quote)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 lg:basis-2/5">
          <h3 className="text-xl font-bold">Inbox</h3>
          <InboxNav />
          <InboxList />
        </div>
      </div>
      <div className="sticky bottom-4 lg:absolute lg:w-full lg:mx-auto lg:bottom-6">
        <BottomNav />
      </div>
    </div>
  );
}
