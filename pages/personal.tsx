import type { NextPage } from "next";
import Link from "next/link";
import { useUser } from "../utils/fetchers";
import { useEffect } from "react";
import Router from "next/router";
const Personal: NextPage = () => {
  const { data, isUser } = useUser();
  return (
    <div className="flex flex-col flex-grow items-center justify-center w-full text-center p-3 h-full">
      <h1 className=" text-6xl font-bold text-teal-800">
        Welcome to the movielist demo site!
      </h1>
      <p className=" mt-3 text-2xl text-teal-700">
        {isUser ? `greetings, ${data.username}` : `greetings, `}
      </p>

      <div className="flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link href={isUser ? "/login" : "/"}>
          <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-teal-700 duration-200 hover:border-transparent hover:text-white">
            <h3 className="text-2xl font-bold">Your list</h3>
            <p className="mt-4 text-xl">Checkout your list.</p>
          </a>
        </Link>

        <Link href="/Test">
          <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-teal-700 duration-200 hover:border-transparent hover:text-white">
            <h3 className="text-2xl font-bold">Example</h3>
            <p className="mt-4 text-xl">Checkout an example movielist.</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Personal;
