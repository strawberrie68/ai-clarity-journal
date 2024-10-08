import React from "react";

export const formatDate = (date: string | number | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", options);
};

export const formatDateWithoutMonth = (date: string | number | Date) => {
  const dateObj = new Date(date);
  const options = { weekday: "short", day: "numeric" };
  const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "short" });
  const dayOfMonth = dateObj.toLocaleDateString("en-US", { day: "numeric" });
  return `${dayOfWeek} ${dayOfMonth}`;
};

export const formattedHaiku = (haiku: string) => {
  return haiku?.split(",").map((part, index) => (
    <p key={index}>
      {part.trim()}
      <br />
    </p>
  ));
};

export const formatQuote = (quote: string): JSX.Element | null => {
  if (!quote) return null;

  const [quoteText, author] = quote.split(" - ");
  const authorLine = author ? (
    <p className="mt-2 text-xs flex justify-end pr-10">- {author}</p>
  ) : null;

  return (
    <div>
      <p className="text-lg">{quoteText}</p>
      {authorLine}
    </div>
  );
};

export const getCurrentTimePeriod = () => {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18 ? "morning" : "night";
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
