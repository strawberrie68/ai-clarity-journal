import Header from "@/components/common/Header";
import "../../../styles/global.css";
import React, { useState } from "react";
import Button from "@/components/common/Button";

const Summary = () => {
  const flexCenter = "flex justify-center items-center";

  const haiku =
    "Gratitude and strain, Balance joy, release the pain — Choose paths that sustain.";
  const [activeTab, setActiveTab] = useState("keypoints");

  const handleToggle = (tab) => {
    setActiveTab(tab);
  };

  const activeTabStyle =
    "flex justify-center items-center bg-black rounded-xl h-9 px-6";
  const inactiveTabStyle =
    "rounded-xl h-9 px-6 border flex justify-center items-center";

  const activeTextStyle = "text-white";


  const formattedHaiku = haiku.split(",").map((part, index) => (
    <p key={index}>
      {part.trim()}
      <br />
    </p>
  ));

  return (
    <section className="mx-6 mt-10 pb-8">
      <Header />
      <h1 className="text-3xl font-bold mt-11">Summary</h1>
      <section className="w-full min-h-16 px-4 py-4 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
        <h2 className="text-lg font-semibold max-w-prose">Overview</h2>
        <p>ai summary</p>
      </section>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Highlights</h3>
        <div className="flex justify-start gap-4 mt-4 items-center">
          <div
            className={`${
              activeTab === "keypoints" ? activeTabStyle : inactiveTabStyle
            }`}
            onClick={() => handleToggle("keypoints")}
          >
            <h3
              className={`${
                activeTab === "keypoints" ? activeTextStyle : ""
              }  text-sm`}
            >
              Key Points
            </h3>
          </div>
          <div
            className={`${
              activeTab === "suggestions" ? activeTabStyle : inactiveTabStyle
            }`}
            onClick={() => handleToggle("suggestions")}
          >
            <h3
              className={`${
                activeTab === "suggestions" ? activeTextStyle : ""
              }  text-sm`}
            >
              Suggestions
            </h3>
          </div>
        </div>
      </div>
      {activeTab === "keypoints" && (
        <section className="mt-8 flex flex-col gap-4">
          <div
            className={`border rounded-xl px-4 py-4 flex flex-col justify-center bg-zinc-100`}
          >
            <h3 className="font-semibold text-sm text-neutral-400">
              ⭐️ Key Insight:
            </h3>
            <p className="mt-2 max-w-prose">
              Prioritize relationships and activities that bring joy and
              fulfillment, balancing gratitude and excitement with the need to
              address draining commitments.
            </p>
          </div>
          <div
            className={`border rounded-xl px-4 py-2 flex flex-col justify-center`}
          >
            <h3 className="font-semibold text-sm text-neutral-300">
              💭 Quote:
            </h3>
            <p className="mt-2 max-w-prose">
              "Surround yourself with people who lift you higher."
            </p>
          </div>
          <div
            className={`border rounded-xl px-4 py-2 flex flex-col justify-center`}
          >
            <h3 className="font-semibold text-sm text-neutral-300">
              🍦 Highlight:
            </h3>
            <p className="mt-2 max-w-prose">
              Happy and grateful for the support and good times shared with
              their boyfriend and team
            </p>
          </div>
          <div
            className={`border rounded-xl px-4 py-2 flex flex-col justify-center`}
          >
            <h3 className="font-semibold text-sm text-neutral-300">
              🎨 Haiku:
            </h3>
            <div className="mt-2">{formattedHaiku}</div>
          </div>
        </section>
      )}

      {activeTab === "suggestions" && (
        <section>
          <ul className="mt-6 gap-4 flex flex-col">
            <li className="border rounded-xl px-4 py-2 flex items-center">
              <div className="flex basis-5/6 gap-4 items-center">
                <div className="w-10 h-10 flex justify-center items-center bg-amber-100 rounded-xl">
                  <p>🏃‍♀️</p>
                </div>
                <p>Drink only 3 cups of coffee</p>
              </div>
              <div className="basis-1/6 flex justify-end pr-4">
                <p className="text-xl text-sky-600">+</p>
              </div>
            </li>
            <li className="border rounded-xl px-4 py-2 flex items-center">
              <div className="flex basis-5/6 gap-4 items-center">
                <div className="w-10 h-10 flex justify-center items-center bg-amber-100 rounded-xl">
                  <p>🏃‍♀️</p>
                </div>
                <p>Drink only 3 cups of coffee</p>
              </div>
              <div className="basis-1/6 flex justify-end pr-4">
                <p className="text-xl text-sky-600">+</p>
              </div>
            </li>
          </ul>
        </section>
      )}

      <div className="mt-14">
        <Button buttonText="Next" isPrimary={true} />
      </div>
    </section>
  );
};

export default Summary;
