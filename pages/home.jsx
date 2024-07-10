import React from "react";
import "../styles/global.css";
import NavBar from "@/components/common/NavBar";
import Card from "@/components/common/Card";
import InboxNav from "@/components/common/InboxNav";
import InboxList from "@/components/common/InboxList";
import BottomNav from "@/components/common/BottomNav";

export default function Home() {
  const flexCenter = "flex justify-center items-center";
  return (
    <div className="mx-6 mt-10 pb-8">
      <div className="flex justify-between">
        <div className="">
          <button
            className={`bg-zinc-100 h-16 w-16 rounded-full ${flexCenter}`}
          >
            <img src="/list.svg" alt="nav-bar" />
          </button>
          <div className="mt-16">
            <p className="text-6xl font-bold">Hello,</p>
            <p className="text-6xl font-bold">Michelle</p>
          </div>
        </div>
        <div>
          <img src="/user-profile.png" />
        </div>
      </div>
      <NavBar />
      <div className="mt-10 flex gap-4 overflow-scroll">
        <Card
          text="Enter Your Daily Journal"
          icon="/book-white.svg"
          secondaryBackground="bg-[#D3AC1E]"
          background="bg-[#F0E2AE]"
          textBackground="bg-white/50"
        />
        <Card
          text="Tips: Everyday is a good day to start"
          icon="/lightbulb.svg"
          secondaryBackground="bg-[#D3AC1E]"
          background="bg-gradient-to-br from-lime-200 to-pink-400"
          textBackground="bg-white/70"
        />
        <Card
          text="Tips: Everyday is a good day to start"
          icon="/lightbulb.svg"
          secondaryBackground="bg-[#D3AC1E]"
          background="bg-lime-100"
          textBackground="bg-[#f0f0f0]"
        />
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-bold">Inbox</h3>
        <InboxNav />
        <InboxList />
      </div>
      <BottomNav />
    </div>
  );
}
