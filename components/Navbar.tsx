import useSWR from "swr";
import Router, { useRouter } from "next/router";
import { logout } from "../utils/auth";
import { useSWRConfig } from "swr";
import Link from "next/link";
const Navbar = () => {
  // Who needs states when you got swr
  const { data, error } = useSWR(
    "/api/getCurrentUserName",
    async (url: string) => {
      const res = await fetch(url);
      if (res.status >= 300) {
        throw new Error("API error");
      }
      return res.json();
    },
    { revalidateOnFocus: false }
  );

  return (
    <nav className="border border-teal-300 flex items-center p-3 rounded-b-md bg-teal-100 sticky top-0">
      <div className="flex items-center  w-full">
        <div className="flex underline text-teal-800 basis-1/4">
          <Link href={"/"}>
            <a>
              <p className="font-semibold">Movielist</p>
            </a>
          </Link>
        </div>
        {error ? (
          <Default />
        ) : data && data.user ? (
          <DefaultLoggedIn username={data.username} />
        ) : (
          <Default />
        )}
      </div>
    </nav>
  );
};

const DefaultLoggedIn = ({ username }: { username: string }) => {
  const { mutate } = useSWRConfig();
  return (
    <>
      <div className="flex items-baseline tracking-tight basis-2/4 justify-center">
        <span className=" text-sm text-teal-800">Logged in as:&nbsp;</span>
        <span className=" font-semibold text-teal-900 ">{username}</span>
      </div>
      <div className="flex justify-end basis-1/4">
        <button
          className="text-md px-4 py-2 leading-none border rounded text-teal-500 bg-white border-teal-300 hover:border-transparent hover:text-white hover:bg-teal-700"
          onClick={async () => {
            await logout();
            mutate("/api/getCurrentUserName");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

const Default = () => {
  const { pathname } = useRouter();
  return (
    <>
      <div className="flex items-baseline tracking-tight basis-2/4 justify-center">
        <span className=" text-sm text-teal-800">Welcome to the&nbsp;</span>
        <span className=" font-semibold text-teal-900 ">
          {pathname === "/" ? "Home" : pathname.substring(1)}&nbsp;
        </span>
        <span className=" text-sm text-teal-800">page!&nbsp;</span>
      </div>
      <div className="flex justify-end basis-1/4">
        <button
          className={`text-md px-4 py-2 leading-none border rounded text-teal-500 bg-white border-teal-300 hover:border-transparent hover:text-white hover:bg-teal-700 ${
            pathname === "/login" && "invisible"
          }`}
          onClick={async () => {
            Router.push("/login");
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Navbar;
