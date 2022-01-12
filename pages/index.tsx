import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center w-full text-center p-3 h-full">
      <h1 className=" text-6xl font-bold text-teal-800">
        Welcome to the movielist demo site!
      </h1>
      <p className=" mt-3 text-2xl text-teal-700">
        Below you can create an account, login or browse an example list!
      </p>

      <div className="flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link href="/signup">
          <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-teal-700 duration-200 hover:border-transparent hover:text-white">
            <h3 className="text-2xl font-bold">Signup</h3>
            <p className="mt-4 text-xl">
              Create an account and start using your movielist.
            </p>
          </a>
        </Link>

        <Link href="/login">
          <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-teal-700 duration-200 hover:border-transparent hover:text-white">
            <h3 className="text-2xl font-bold">Login</h3>
            <p className="mt-4 text-xl">
              Login using your username and password.
            </p>
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

export default Home;
