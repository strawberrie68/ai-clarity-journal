import React from "react";
import Image from "next/image";

const JournalCard = ({ src, alt, label, onClick, selected }) => (
  <article
    className={`border rounded-2xl min-w-36 flexCenter flex-col h-28 bg-zinc-100 hover:border-black ${
      selected ? "border-black" : "border-stone-300"
    }`}
    onClick={onClick}
  >
    <Image src={src} width={40} height={40} alt={alt} />
    <p className="font-bold pt-2">{label}</p>
  </article>
);

export default JournalCard;
