import React, { useState, useEffect } from "react";
import Image from "next/image";
import BottomNav from "@/components/common/BottomNav";
import "../styles/global.css";

export default function Review() {

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-lg lg:mx-auto">
      <header className="flex justify-between lg:max-w-screen-lg lg:mx-auto">
        <section>
          <button className="bg-zinc-100 h-11 w-11 rounded-full flexCenter">
            <Image src="/list.svg" alt="nav-bar" width={18} height={18} />
          </button>
          <div className="mt-10">
            <p className="text-5xl font-bold">Hello,</p>
            <p className="text-5xl font-bold">Michelle</p>
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

      <section className="flex w-full justify-start items-center mt-16">
        <p className="py-10 border flexCenter px-10 rounded-lg">Currently under constructions. Check back soon! :)</p>
      </section>

      <nav className="sticky bottom-4 lg:absolute lg:w-full lg:mx-auto lg:bottom-6">
        <BottomNav />
      </nav>
    </main>
  );
}
