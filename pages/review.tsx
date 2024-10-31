import React from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import BottomNav from "@/components/common/BottomNav";
import "../styles/global.css";
import Header from "@/components/common/Header";

export default function Review() {
  const router = useRouter()
  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-lg lg:mx-auto">
      <Header handleClick={() => router.push("/")} />
      <div className="mt-10">
        <p className="text-5xl font-bold">Hello,</p>
        <p className="text-5xl font-bold">Test User</p>
      </div>
      <section className="flex w-full justify-start items-center mt-10">
        <p className="py-10 border flexCenter px-10 rounded-lg">
          Currently under constructions. Check back soon! :)
        </p>
      </section>
      <nav className="fixed w-full mx-auto px-6 bottom-4 left-0 lg:absolute lg:w-full lg:mx-auto lg:bottom-6">
        <BottomNav />
      </nav>
    </main>
  );
}
