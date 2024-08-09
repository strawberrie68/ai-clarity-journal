import React, { useState } from "react";
import ButtonCopy from "@/components/common/ButtonCopy";
import Link from "next/link";
import "../../styles/global.css";
import Image from "next/image";
import axios from "axios";

const formValues = {
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [user, setUser] = useState(formValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = await validateUser(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/users", user);
      if (response) {
        const data = await response.data;
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const validateUser = async (user) => {
    const errors = {};
    if (!user.email) {
      errors.email = "Please enter your email";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        errors.email = "Please enter a valid email address";
      } else {
        const emailAvailable = await checkEmailAvailability(user.email);
        if (!emailAvailable) {
          errors.email = "Email is already taken";
        }
      }
    }
    if (!user.username) {
      errors.username = "Please enter your username";
    } else {
      const usernameAvailable = await checkUsernameAvailability(user.username);
      if (!usernameAvailable) {
        errors.username = "Username is already taken";
      }
    }
    if (!user.password) {
      errors.password = "Please enter your password";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const checkEmailAvailability = async (email) => {
    try {
      const response = await axios.get(`/api/users?email=${email}`);
      return response.data.exists === false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(`/api/users?username=${username}`);
      return response.data.exists === false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(user);
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <main className="mx-8 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <div className="flex gap-4 items-center">
        <Link href="/login">
          <div className="w-18 h-18">
            <Image src={"/chevron.png"} alt="chevron" width={9} height={15} />
          </div>
        </Link>

        <p className="font-semibold">Registration</p>
      </div>

      <>
        <h2 className="text-4xl font-semibold mt-12">
          Create a free account 📝
        </h2>
        <section className="mt-10">
          <form className="flex flex-col gap-4 mb-6">
            <section className="flex flex-col gap-4">
              <fieldset>
                <h3 className="font-semibold text-off-black">Your username</h3>
                <legend className="sr-only">Enter your username</legend>
                <input
                  className="border border-dk-gray h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
                  placeholder="Enter your username..."
                  value={user.username}
                  name="username"
                  onChange={handleInputChange}
                ></input>
                {errors.username && <p className="error">{errors.username}</p>}
              </fieldset>
              <fieldset>
                <h3 className="font-semibold text-off-black">Your name</h3>
                <legend className="sr-only">Enter your name</legend>
                <input
                  className="border border-dk-gray h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
                  placeholder="Enter your name..."
                  value={user.name}
                  name="name"
                  onChange={handleInputChange}
                ></input>
                {errors.username && <p className="error">{errors.username}</p>}
              </fieldset>
              <fieldset>
                <h3 className="font-semibold text-off-black">Your email</h3>
                <legend className="sr-only">Enter your email</legend>
                <input
                  className="border border-dk-gray h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
                  placeholder="Enter your email..."
                  value={user.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                ></input>
                {errors.email && <p className="error">{errors.email}</p>}
              </fieldset>
              <fieldset>
                <h3 className="font-semibold text-off-black">Password</h3>
                <legend className="sr-only">Enter your password</legend>
                <input
                  className="border border-dk-gray bg-white h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
                  placeholder="Enter your password..."
                  value={user.password}
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                ></input>
                {errors.password && <p className="error">{errors.password}</p>}

                <div className="mt-2 flex gap-4 items-center">
                  <p className="text-off-black">Strong</p>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 border  rounded-full border-off-black bg-off-black"></div>
                    <div className="h-2 w-2 border rounded-full border-off-black"></div>
                    <div className="h-2 w-2 border rounded-full border-off-black"></div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <h3 className="font-semibold text-off-black">
                  Confirm password
                </h3>
                <legend className="sr-only">
                  Enter your password again...
                </legend>
                <input
                  className="border border-dk-gray bg-white h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow"
                  placeholder="Enter your password again..."
                  value={user.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  onChange={handleInputChange}
                ></input>
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </fieldset>
            </section>
            <div className="flex flex-col mt-12 w-full -left-6 lg:max-w-screen-md lg:bottom-4">
              <ButtonCopy
                buttonText={loading ? "Loading.." : "Create a new account"}
                buttonType="primary"
                handleClick={handleSubmit}
                disabled={loading}
              />
            </div>
          </form>
          <Link href={"/login"}>
            <ButtonCopy
              buttonText={
                <>
                  Have an account? &nbsp; <strong> Login here</strong>
                </>
              }
              buttonType="secondary"
              disabled={loading}
            />
          </Link>
        </section>
      </>
      {/* ) : (
        <div>
          <h2 className="text-3xl font-semibold mt-12">Account Exists!</h2>
          <div className="mt-8">
            <p className="text-off-black font-medium">
              The account for the email
            </p>
            <div className="border border-dk-gray bg-white h-12 rounded w-full mt-2 px-4 placeholder:italic placeholder:text-placeholder-gray input-shadow flex items-center">
              <p>michelle@gmail.com</p>
            </div>
            <p className="text-off-black font-medium pt-4">
              Already exists. Try logging in instead or pick a different email
              address.
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-6">
            <ButtonCopy
              buttonText={<>Login</>}
              buttonType="primary"
              disabled={loading}
            />

            <ButtonCopy
              buttonText={
                <>
                  Use a different email? &nbsp; <strong> Register</strong>
                </>
              }
              buttonType="secondary"
              disabled={loading}
            />
          </div>
        </div>
      )} */}
    </main>
  );
};

export default Register;
