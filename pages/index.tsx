import type { NextPage } from "next";
import Link from "next/link";

/*
  Design notes:
    For users that are not logged in:
      Show buttons and accomodating text to let users login,
      create an account or see an example list
    
    For logged in users:
      Redirect to their page?
        Since auth is saved in cookies we can possibly redirect if a auth cookie is present
        as per: https://nextjs.org/docs/api-reference/next.config.js/redirects#header-cookie-and-query-matching

        Or request-time redirection with getServerSideProps
      Show personalized content?
      Dont change this page?
*/

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center p-3 mt-12">
      <h1 className=" text-6xl font-bold text-teal-800">
        Welcome to the movielist demo site!
      </h1>
      <p className=" mt-3 text-2xl text-teal-700">
        Below you can create a account, login or browse an example list!
      </p>

      <div className="flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link href="/">
          <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 hover:border-transparent hover:text-white hover:bg-teal-700">
            <h3 className="text-2xl font-bold">Signup</h3>
            <p className="mt-4 text-xl">
              Create an account and start using your movielist.
            </p>
          </a>
        </Link>

        <Link href="/">
          <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 hover:border-transparent hover:text-white hover:bg-teal-700">
            <h3 className="text-2xl font-bold">Login</h3>
            <p className="mt-4 text-xl">
              Login using your username and password.
            </p>
          </a>
        </Link>

        <Link href="/">
          <a className="p-6 mt-6 text-left border w-96 rounded-xl text-teal-700 bg-white border-teal-300 hover:border-transparent hover:text-white hover:bg-teal-700">
            <h3 className="text-2xl font-bold">Example</h3>
            <p className="mt-4 text-xl">Go checkout an example movielist.</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
