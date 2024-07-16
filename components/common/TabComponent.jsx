import React, { useState } from "react";

const TabComponent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const handleToggle = (tabKey) => {
    setActiveTab(tabKey);
  };

  const activeTabStyle = "bg-black text-white font-medium";
  const inactiveTabStyle = "bg-zinc-100 text-black";
  const activeTextStyle = "text-white";

  return (
    <div>
      <div className="flex justify-start gap-4 mt-4 items-center">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`${
              activeTab === tab.key ? activeTabStyle : inactiveTabStyle
            } rounded-full h-9 px-6 flex justify-center items-center cursor-pointer`}
            onClick={() => handleToggle(tab.key)}
          >
            <h3
              className={`${
                activeTab === tab.key ? activeTextStyle : ""
              } text-sm`}
            >
              {tab.label}
            </h3>
          </div>
        ))}
      </div>
      <div className="content mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            style={{ display: activeTab === tab.key ? "block" : "none" }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;
