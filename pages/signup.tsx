import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { FormEvent, useState } from "react";

const Signup: NextPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    retyped: "",
    error: "",
    loading: false
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserData({ ...userData, error: "", loading: true });

    const { username, password, retyped } = userData;

    try {
      if (password !== retyped) {
        throw new Error("passwords dont match");
      }
      // TODO: input validation.
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.status !== 200) {
        const { message } = await res.json();
        console.log(res.status);
        throw new Error(
          message === "instance not unique" ? "username taken" : message
        );
      }
      Router.push("/login");
    } catch (error) {
      const { message } = error as Error;
      setUserData({ ...userData, error: message, loading: false });
    }
  };

  return (
    <div className="flex flex-grow h-full w-full items-center justify-center flex-col ">
      <div className="flex flex-col mb-48">
        <div className="bg-teal-100 pt-3 pb-3 rounded-t-md border border-gray-100 text-center shadow-md ">
          <h1 className=" text-teal-800 font-semibold">Sign Up</h1>
        </div>
        <form
          className=" bg-white rounded px-12 pt-10 pb-12 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className=" mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-300 focus:ring-1 focus:ring-teal-500"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setUserData(
                  Object.assign({}, userData, { username: e.target.value })
                )
              }
            ></input>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-teal-300 focus:ring-1 focus:ring-teal-500 mb-3"
              id="password"
              type="password"
              placeholder="*************"
              onChange={(e) =>
                setUserData(
                  Object.assign({}, userData, { password: e.target.value })
                )
              }
            ></input>
          </div>
          <div className=" mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="retype"
            >
              Retype Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-teal-300 focus:ring-1 focus:ring-teal-500 mb-3"
              id="retype"
              type="password"
              placeholder="*************"
              onChange={(e) =>
                setUserData(
                  Object.assign({}, userData, { retyped: e.target.value })
                )
              }
            ></input>
            <p className={`text-red-500 text-xs italic h-1 tracking-tight`}>
              {userData.error}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-100 text-teal-700 hover:bg-teal-200 hover:text-teal-800 focus:outline-none focus:shadow-outline py-2 px-4 rounded font-semibold "
              type="submit"
            >
              Sign Up
            </button>
            {userData.loading && (
              <div
                className={`w-4 h-4 border-b-2 border-teal-700 rounded-full animate-spin`}
              ></div>
            )}
            <Link href={"/login"}>
              <a className="text-teal-700 hover:text-teal-900 text-sm">
                Already signed up?
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
