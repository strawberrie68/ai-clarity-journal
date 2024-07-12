import React from "react";
import "../styles/global.css";
import NavBar from "@/components/common/NavBar";
import Card from "@/components/common/Card";
import InboxNav from "@/components/common/InboxNav";
import InboxList from "@/components/common/InboxList";
import BottomNav from "@/components/common/BottomNav";
import Link from "next/link";

export default function Home() {
  const flexCenter = "flex justify-center items-center";
  const formatQuote = (quote) => {
    if (!quote) return null;

    const [quoteText, author] = quote.split(" - ");
    return (
      <div className="">
        <p className="text-lg">{quoteText}</p>
        {author && (
          <>
            <p className="mt-2 text-xs"> - {author}</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="mx-6 mt-10 pb-8">
      <div className="flex justify-between lg:max-w-screen-lg lg:mx-auto">
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
      <div className="lg:max-w-screen-lg lg:mx-auto">
        <NavBar />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:max-w-screen-lg lg:mx-auto">
        <div className="flex lg:flex-col gap-4 overflow-scroll lg:overflow-x-auto">
          <div className="mt-10 flex gap-4 lg:basis-2/5">
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
              text="Tips: Everyday is a good day to start"
              icon="/lightbulb.svg"
              secondaryBackground="bg-[#D3AC1E]"
              background="bg-lime-100"
              textBackground="bg-[#f0f0f0]"
            />
          </div>
          <div className="mt-10 lg:mt-0">
            <div
              className={`h-44 min-w-40 rounded-2xl relative bg-gray-100 px-4 py-4 ${flexCenter}`}
            >
              <div className="text-gray-400 max-w-50">
                {!journal && (
                  <p>Excitement is a better motivator than discipline.</p>
                )}
                <p className="">{journal && formatQuote(journal.quote)}</p>
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
