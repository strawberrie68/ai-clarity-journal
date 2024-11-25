import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { SunIcon } from "@radix-ui/react-icons"
import BottomNav from "../components/common/BottomNav";
import NavBar from "../components/common/NavBar";
import ProfileNav from "../components/common/ProfileNav";
import "../styles/global.css";


interface User {
  name: string;
  username: string;
  email: string;
  journals: string[];
  habits?: string[];
}

export interface Journal {
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
  const [headerText, setHeaderText] = useState("Hello,");
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

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'today':
        setHeaderText("Hello,");
        break;
      case 'tasks':
        setHeaderText("Tasks");
        break;
      case 'goals':
        setHeaderText("Goals");
        break;
      default:
        setHeaderText("Hello,");
    }
  };

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
            <p className="text-5xl font-bold">{headerText}</p>
            {headerText === "Hello," && (
              <p className="text-5xl font-bold">{user ? user.name : "Loading..."}</p>
            )}
          </div>
        </section>
        <section>
          <ProfileNav />
        </section>
      </header>

      <NavBar journal={journal} onTabChange={handleTabChange} />

      <nav className="fixed w-full mx-auto px-4 bottom-4 left-0 lg:bottom-6">
        <BottomNav />
      </nav>
    </main>
  );
}
