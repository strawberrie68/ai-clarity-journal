import "../../../styles/global.css";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { useState } from "react";

const initialValues = {
  entry: "",
};

const Chat = () => {
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
          <h2 className="text-lg font-semibold">Response</h2>
          <p className="max-w-prose">ai summary</p>
        </div>
        <div>
          <h3 className="font-semibold">Journal</h3>
          <textarea
            className="border border-inherit rounded-lg h-64 w-full mt-2 px-4 py-2 max-w-prose"
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
export default Chat;
