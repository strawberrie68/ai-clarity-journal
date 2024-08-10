import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { formatQuote } from "@/utils/formatUtils";
import { useAuth } from "./AuthContext";
import BottomNav from "@/components/common/BottomNav";
import Card from "@/components/common/Card";
import InboxNav from "@/components/common/InboxNav";
import NavBar from "@/components/common/NavBar";
import "../styles/global.css";

interface User {
  name: string;
  username: string;
  email: string;
  journals: string[];
  habits?: string[];
}

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
  entries: string[];
  date: string;
}

export default function Home() {
  const flexCenter = "flex justify-center items-center";
  const [journal, setJournal] = useState<Journal | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { userId, token } = useAuth() as { userId: string; token: string };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      fetchLatestJournal(userId);
    }
  }, [token, userId]);

  const fetchUser = async (userId: string) => {
    try {
      const response = await axios.get<User[]>(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data[0] || null);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLatestJournal = async (userId: string) => {
    try {
      const response = await axios.get<Journal[]>(`/api/users/${userId}/journals`);
      const data = response.data;
      if (data.length > 0) {
        const sortedJournals = data
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 7);
        setJournal(sortedJournals[0] || null);
      } else {
        setJournal(null);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <main className="mx-6 mt-10 pb-8">
      <header className="flex justify-between lg:max-w-screen-lg lg:mx-auto">
        <section>
          <button
            className={`bg-zinc-100 h-11 w-11 rounded-full ${flexCenter}`}
          >
            <Image src="/list.svg" alt="nav-bar" width={18} height={18} />
          </button>
          <div className="mt-10">
            <p className="text-5xl font-bold">Hello,</p>
            <p className="text-5xl font-bold">{user ? user.name : "Loading..."}</p>
          </div>
        </section>
        <section>
          <Image
            src="/user-profile.png"
            alt="user profile"
            width={44}
            height={44}
          />
        </section>
      </header>
      <section className="lg:max-w-screen-lg lg:mx-auto">
        <NavBar />
      </section>
      <section className="flex flex-col lg:flex-row lg:justify-between lg:max-w-screen-lg lg:mx-auto lg:gap-8">
        <section className="flex lg:flex-col gap-4 overflow-scroll lg:overflow-x-auto lg:basis-3/5">
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
                !journal
                  ? "Tips: Everyday is a good day to start"
                  : journal.keyInsight || "Tips: Everyday is a good day to start"
              }
              icon="/lightbulb.svg"
              secondaryBackground="bg-[#D3AC1E]"
              background="bg-lime-100"
              textBackground="bg-[#f0f0f0]"
            />
          </div>
          <article className="mt-10 text-gray-400 lg:mt-0 h-44 min-w-40 max-w-lg rounded-2xl relative bg-gray-100 px-4 py-4 flexCenter">
            {!journal && (
              <p>Excitement is a better motivator than discipline.</p>
            )}
            {journal && journal.quote && (
              <p className="line-clamp-4">{formatQuote(journal.quote)}</p>
            )}
          </article>
        </section>
        <section className="mt-8 lg:mt-0 lg:basis-2/5">
          <h3 className="text-xl font-bold">Inbox</h3>
          <InboxNav />
        </section>
      </section>
      <nav className="sticky bottom-4 lg:absolute lg:w-full lg:mx-auto lg:bottom-6">
        <BottomNav />
      </nav>
    </main>
  );
}
