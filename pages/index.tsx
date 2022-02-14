import type { NextPage } from "next";
import TextLink from "../components/TextLink";

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
        <TextLink
          href="/signup"
          heading="Signup"
          paragraph="Create an account and start using your movielist"
        />
        <TextLink
          href="/login"
          heading="Login"
          paragraph="Login using your username and password"
        />
        <TextLink
          href="/list/testi2"
          heading="Example"
          paragraph="Checkout an example movielist"
        />
      </div>
    </div>
  );
};

export default Home;
