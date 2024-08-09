import React, { useState } from "react";
import ButtonCopy from "@/components/common/ButtonCopy";
import Link from "next/link";
import Image from "next/image";
import "../../styles/global.css";

const initialValues = { username: "", password: "" };
const testUser = { username: "test-user", password: "test-password" };

const Reset = () => {
  const [reset, setReset] = useState({
    initialValues,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Reset),
      });
      if (response) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReset({
      ...Reset,
      [name]: value,
    });
  };

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <div className="flex gap-4 items-center">
        <div className="w-18 h-18">
          <Image src={"/chevron.png"} alt="chevron" width={9} height={15} />
        </div>

        <p className="font-semibold">Forgot password</p>
      </div>
      <div>
        <h2 className="text-4xl font-semibold mt-12 ">
          Reset your password now 📮
        </h2>
        <p className="mt-8 text-off-black">Send a new password to your email</p>
        <div className="mt-2">
          <p className="text-off-black font-medium"></p>
          <form className="mt-8">
            <fieldset>
              <h3 className="font-semibold text-off-black">Your username</h3>
              <legend className="sr-only">Enter your username</legend>
              <input
                className="border border-dk-gray h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
                placeholder="Enter your username..."
                value={reset.username}
                onChange={handleInputChange}
              ></input>
            </fieldset>
          </form>
        </div>
        <div className="mt-12 flex flex-col gap-6">
          <ButtonCopy
            buttonText={<>Send me a new password</>}
            buttonType="primary"
            disabled={loading}
          />

          <ButtonCopy
            buttonText={
              <>
                Already have an account? &nbsp; <strong> Login</strong>
              </>
            }
            buttonType="secondary"
            disabled={loading}
          />
        </div>
      </div>
    </main>
  );
};

export default Reset;
