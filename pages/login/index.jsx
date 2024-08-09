import React, { useState } from "react";
import ButtonCopy from "@/components/common/ButtonCopy";
import Link from "next/link";
import "../../styles/global.css";
import axios from "axios";
import { useRouter } from "next/router";

const testUser = { username: "test-user", password: "test-password" };

const Login = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTestUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users", testUser);
      if (response) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("password", login);
    try {
      const response = await axios.post("/api/users/login", login);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userId", response.data.userId);
      console.log("token", response.data.token);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    if (loading === false) {
      router.push("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(login);
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <div className="w-24 h-24 border-dk-gray border rounded-[30px] flex justify-center items-center m-auto mb-20 mt-16">
        <p className="text-5xl">☀️</p>
      </div>
      <form className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <fieldset>
            <h3 className="font-semibold text-off-black">Your username</h3>
            <legend className="sr-only">Enter your username</legend>
            <input
              className="border border-dk-gray h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
              placeholder="Enter your username..."
              value={login.username}
              name="username"
              onChange={handleInputChange}
            ></input>
          </fieldset>
          <fieldset>
            <h3 className="font-semibold text-off-black">Password</h3>
            <legend className="sr-only">Enter your password</legend>
            <input
              className="border border-dk-gray bg-white h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
              placeholder="Enter your password..."
              value={login.password}
              onChange={handleInputChange}
              type="password"
              name="password"
            ></input>
          </fieldset>
          <div className="">
            <Link href="/forgot-password">
              <p className="font-medium text-right	text-off-black">
                Forgot password?
              </p>
            </Link>
          </div>
        </section>
        <div className="flex flex-col mt-4 w-full -left-6 lg:max-w-screen-md lg:bottom-4">
          <ButtonCopy
            buttonText="Login"
            buttonType="primary"
            handleClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </form>
      <div className="mt-8">
        <ButtonCopy
          buttonText={
            <>
              Want to try app out? &nbsp; <strong> Test here</strong>
            </>
          }
          buttonType="primary-2"
          handleClick={handleTestUser}
          disabled={loading}
        />
      </div>
      <div className="flex my-10 items-center">
        <div className="border border-lt-gray h-0 w-full"></div>
        <p className="px-4 text-dk-gray">or</p>
        <div className="border border-lt-gray h-0 w-full"></div>
      </div>
      <Link href={"/register"}>
        <ButtonCopy
          buttonText={
            <>
              Don't have an account? &nbsp; <strong> Register here</strong>
            </>
          }
          buttonType="secondary"
          disabled={loading}
        />
      </Link>
    </main>
  );
};

export default Login;