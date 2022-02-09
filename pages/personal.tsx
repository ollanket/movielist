import type { NextPage } from "next";
import Link from "next/link";
import { useUser } from "../utils/hooks/use-user";
import TextLink from "../components/TextLink";

const Personal: NextPage = () => {
  const { data } = useUser();
  return (
    <div className="flex flex-col flex-grow items-center justify-center w-full text-center p-3 h-full">
      <h1 className=" text-6xl font-bold text-teal-800">
        Welcome to the movielist demo site!
      </h1>
      <p className=" mt-3 text-2xl text-teal-700">
        {data?.user ? `greetings, ${data.username}` : `greetings, `}
      </p>

      <div className="flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full">
        <TextLink
          href={data?.user ? `list/${data.username}` : "/"}
          heading="Your list"
          paragraph="Checkout your list"
        />

        <TextLink
          href="/Test"
          heading="Example"
          paragraph="Checkout an example movielist"
        />
      </div>
    </div>
  );
};

export default Personal;
