import React, { createContext, useState } from "react";

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [journalPrompts, setJournalPrompts] = useState([
    "✨ What's your highest priority today?",
    "💭 Is there anything worrying you about the day ahead?",
    "🥳 What are you looking forward to today?",
  ]);

  return (
    <JournalContext.Provider value={{ journalPrompts, setJournalPrompts }}>
      {children}
    </JournalContext.Provider>
  );
};
