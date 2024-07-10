import React from "react";
import "../../styles/global.css";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { useState } from "react";

const initialValues = {
  mood: "",
  entry: "",
};

const Add = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="mx-6 mt-10 pb-8">
      <Header />
      <DateTitle />
      <form className=" flex flex-col gap-4">
        <div className="w-full h-36 px-4 py-4 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
          <h2 className="text-lg font-semibold">Question</h2>
          <p>What's your highest priority today?</p>
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
            onChange={handleInputChange}
            value={values.entry}
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
