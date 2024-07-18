"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { JournalContext } from "../JournalContext";
import Image from "next/image";
import Button from "@/components/common/Button";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import "../../styles/global.css";

const backgroundColors = [
  "bg-gradient-to-r from-lime-50 to-teal-50 ",
  "bg-gradient-to-r from-indigo-100 to-yellow-100",
  "bg-gradient-to-r from-violet-100 to-pink-100",
  "bg-gradient-to-r from-lime-50 to-teal-50 ",
  "bg-gradient-to-r from-indigo-100 to-yellow-100",
];

const Add = () => {
  const { journalPrompts } = useContext(JournalContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [entriesAsString, setEntriesAsString] = useState({ content: "" });
  const router = useRouter();
  console.log(loading);

  useEffect(() => {
    const initialAnswers = journalPrompts.reduce((acc, _, index) => {
      acc[`question${index + 1}`] = "";
      return acc;
    }, {});
    setAnswers(initialAnswers);
  }, [journalPrompts]);

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
    if (currentQuestionIndex < journalPrompts.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setLoading(true);
      const newEntries = [...entries, answers];
      setEntries(newEntries);
      const entriesString = updateEntriesAsString(newEntries);

      try {
        const response = await createJournalEntry(entriesString);
        if (response && response.journalId) {
          push(`/journal/${response.journalId}/chat`);
        } else {
          console.error("Invalid response from createJournalEntry:", response);
        }
      } catch (error) {
        console.error(`ERROR ${error}`);
      }
      setLoading(false);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setEntriesAsString("");
    }
  };

  const updateEntriesAsString = (entries) => {
    const entriesString = entries
      .map((entry) => {
        return journalPrompts
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
      console.error("error", err);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  useEffect(() => {
    updateEntriesAsString(entries);
  }, [entries]);

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <DateTitle />
      <form className="flex flex-col gap-4">
        <article
          className={`w-full px-4 pt-4 pb-8 flex flex-col rounded-lg my-6 ${backgroundColors[currentQuestionIndex]}`}
        >
          <h2 className="text-lg text-gray-500 font-medium">Question</h2>
          <p className="text-xl font-semibold mt-2">
            {journalPrompts[currentQuestionIndex]}
          </p>
        </article>
        <section>
          {currentQuestionIndex === 0 && (
            <>
              <h3 className="font-semibold">Mood</h3>
              <fieldset className="mood__inputs flex justify-between px-2 mt-2 mb-2">
                <legend className="sr-only">Select your mood</legend>
                {["happy", "meh", "blank", "sad", "nervous"].map((mood) => (
                  <label key={mood}>
                    <input
                      type="radio"
                      name="mood"
                      value={mood}
                      onChange={handleInputChange}
                    />
                    <Image
                      src={`/smiley-${mood}.svg`}
                      alt={`${mood} emoji`}
                      width={32}
                      height={32}
                    />
                  </label>
                ))}
              </fieldset>
            </>
          )}
        </section>
        <section>
          <fieldset>
            <h3 className="font-semibold">Journal</h3>
            <legend className="sr-only">
              Write your answer to the journal prompts here
            </legend>
            <textarea
              className="border border-inherit rounded-lg h-48 w-full mt-4 px-4 py-2"
              placeholder="Write something here..."
              value={answers[`question${currentQuestionIndex + 1}`]}
              onChange={handleInputChange}
            ></textarea>
          </fieldset>
        </section>
        <div className="flex justify-between mt-4 relative bottom-6 w-full -left-6 lg:max-w-screen-md lg:bottom-4 lg:relative lg:mx-auto">
          <Button
            buttonText="Cancel"
            isPrimary={false}
            handleClick={handleBack}
          />
          <Button
            buttonText={loading ? "Loading..." : "Next"}
            isPrimary={true}
            handleClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </form>
    </main>
  );
};

export default Add;
