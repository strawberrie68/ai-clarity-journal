
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { useAuth } from "./AuthContext";
import { Journal } from '@/types/task';
import BottomNav from "@/components/common/BottomNav";
import Header from "@/components/common/Header";
import JournalTrends from '@/components/common/JournalTrends';
import "../styles/global.css";

export default function Review() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useAuth();
  const router = useRouter()

  const fetchJournals = async (userId: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/users/${userId}/journals`)
      const data: Journal[] = response.data;
      setJournals(data)
    } catch (error) {
      console.error("failed to fetch errors", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    <div>Loading...</div>
  }


  useEffect(() => {
    if (userId) {
      fetchJournals(userId)
    }
  }, [userId])

  return (
    <main className="flex flex-col gap-4 mx-6 mt-10 pb-20 lg:max-w-screen-lg lg:mx-auto">
      <Header handleClick={() => router.push("/")} />
      <div className="my-10">
        <h1 className="text-5xl font-bold">Review</h1>
      </div>
      <div className='pb-10'>
        <JournalTrends journals={journals} />
      </div>
      {/* <div className="p-6 flex flex-col gap-4 ">
        <h2 className="text-lg font-semibold">Weekly Review</h2>
        <div className='pb-24 '>
          <p>No weekly review yet</p>
        </div>
      </div> */}
      <nav className="fixed w-full mx-auto px-4 bottom-4 left-0 lg:bottom-6">
        <BottomNav />
      </nav>
    </main>
  );
}
