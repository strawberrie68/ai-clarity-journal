"use client";
import React from "react";
import "../../styles/global.css";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const questions = [
  "✨ What's your highest priority today?",
  "💭 Is there anything worrying you about the day ahead?",
  "🌝 What are you looking forward to today?",
];

const Add = () => {
  const flexCenter = "flex justify-center items-center";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });
  const [entries, setEntries] = useState([]);
  const [entriesAsString, setEntriesAsString] = useState({ content: "" });
  const { push } = useRouter();
  const handleInputChange = (e) => {
    const { value } = e.target;
    setAnswers({
      ...answers,
      [`question${currentQuestionIndex + 1}`]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const newEntries = [...entries, answers];
      setEntries(newEntries);
      const entriesString = updateEntriesAsString(newEntries);

      try {
        const response = await createJournalEntry(entriesString);
        console.log("response for createJournalEntry", response);

        if (response && response.journalId) {
          push(`/journal/${response.journalId}/chat`);
        } else {
          console.error("Invalid response from createJournalEntry:", response);
        }
      } catch (error) {
        console.error(`ERROR ${error}`);
      }

      setAnswers({
        question1: "",
        question2: "",
        question3: "",
      });
      setCurrentQuestionIndex(0);
      setEntriesAsString("");
    }
  };

  const updateEntriesAsString = (entries) => {
    const entriesString = entries
      .map((entry, index) => {
        return questions
          .map((question, qIndex) => {
            return `${question}: ${entry[`question${qIndex + 1}`]}`;
          })
          .join(", ");
      })
      .join(" | ");

    setEntriesAsString(entriesString);
    return entriesString;
  };

  const createJournalEntry = async (entriesString) => {
    try {
      const response = await fetch(
        "/api/users/6689d71d5b6990ef9ab9b498/journal/entries",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: entriesString }),
        }
      );
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    updateEntriesAsString(entries);
  }, [entries]);

  console.log(entriesAsString);

  console.log(answers);
  return (
    <div className="mx-6 mt-10 pb-8">
      <Header />
      <DateTitle />
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full h-36 px-4 py-4 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
          <h2 className="text-lg font-semibold">Question</h2>
          <p>{questions[currentQuestionIndex]}</p>
        </div>
        <div>
          <h3 className="font-semibold">Mood</h3>
          <div className="mood__inputs flex justify-between px-2 mt-2 mb-2">
            <label>
              <input
                type="radio"
                name="mood"
                value="happy"
                onChange={handleInputChange}
              />
              <img src="/smiley.svg" alt="happy" />
            </label>
            <label>
              <input
                type="radio"
                name="mood"
                value="meh"
                onChange={handleInputChange}
              />
              <img src="/smiley-meh.svg" alt="meh" />
            </label>
            <label>
              <input
                type="radio"
                name="mood"
                value="blank"
                onChange={handleInputChange}
              />
              <img src="/smiley-blank.svg" alt="blank" />
            </label>
            <label>
              <input
                type="radio"
                name="mood"
                value="sad"
                onChange={handleInputChange}
              />
              <img src="/smiley-sad.svg" alt="sad" />
            </label>
            <label>
              <input
                type="radio"
                name="mood"
                value="nervous"
                onChange={handleInputChange}
              />
              <img src="/smiley-nervous.svg" alt="nervous" />
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Journal</h3>
          <textarea
            className="border border-inherit rounded-lg h-64 w-full mt-2 px-4 py-2"
            placeholder="Write something here..."
            value={answers[`question${currentQuestionIndex + 1}`]}
            onChange={handleInputChange}
            // name="entry"
          ></textarea>
        </div>
        <div className="flex justify-between mt-4">
          <Button buttonText="Cancel" isPrimary={false} />
          <Button buttonText="Next" isPrimary={true} />
        </div>
      </form>
    </div>
  );
};

export default Add;
