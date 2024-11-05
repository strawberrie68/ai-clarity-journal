import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { formatQuote } from "@/utils/formatUtils";
import { useAuth } from "./AuthContext";
import { SunIcon } from "@radix-ui/react-icons"
import BottomNav from "@/components/common/BottomNav";
import Card from "@/components/common/Card";
import NavBar from "@/components/common/NavBar";
import Inbox2, { Todo } from "../components/common/Inbox2"
import ProfileNav from "@/components/common/ProfileNav";
import { PlusCircleIcon } from "lucide-react";
import { Broom } from "@phosphor-icons/react";

import "../styles/global.css";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  username: string;
  email: string;
  journals: string[];
  habits?: string[];
  todo: Todo[];
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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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
      setIsLoading(false)
    } catch (error) {
      console.error(error, "Could not get user");
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
      console.error(error, "error fetching the journal");
    }
  };

  const handleAddTask = () => {
    router.push(`/journal/addTask`)
  }


  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <main className="mx-6 mt-10 pb-8">
      <header className="flex justify-between lg:max-w-screen-lg lg:mx-auto">
        <section>
          <button
            className={`bg-zinc-100 h-11 w-11 rounded-full ${flexCenter}`}
          >
            <SunIcon width={18} height={18} />
          </button>
          <div className="mt-10">
            <p className="text-5xl font-bold">Hello,</p>
            <p className="text-5xl font-bold">{user ? user.name : "Loading..."}</p>
          </div>
        </section>
        <section>
          <ProfileNav />
        </section>
      </header>
      <section className="lg:max-w-screen-lg lg:mx-auto">
        <NavBar />
      </section>
      <section className="flex flex-col lg:flex-row lg:justify-between lg:max-w-screen-lg lg:mx-auto lg:gap-8 pb-24">
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
          <div className="flex justify-between pt-5 pb-3">
            <h3 className="text-xl font-bold">Inbox</h3>
            <div className="flex gap-4 pr-3">
              <button className="group flex items-center gap-1 text-gray-400 min-h-11" onClick={handleAddTask}>
                <PlusCircleIcon width={14} height={14} className="text-gray-400 group-hover:text-black" />
                <p className="text-sm text-gray-400 font-bold group-hover:text-black">Add</p>
              </button>
              <button className="group flex items-center gap-1 text-gray-400 min-h-11">
                <span className="text-gray-400 group-hover:text-black">
                  <Broom size={15} weight="light" />
                </span>
                <p className="text-sm text-gray-400 font-bold group-hover:text-black">Clean up Tasks</p>
              </button>


            </div>
          </div>
          <Inbox2 />
        </section>
      </section>
      <nav className="fixed w-full mx-auto px-4 bottom-4 left-0 lg:absolute lg:w-full lg:mx-auto lg:bottom-6">
        <BottomNav />
      </nav>
    </main>
  );
}
