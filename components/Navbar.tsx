import Router, { useRouter } from "next/router";
import { logout } from "../utils/auth";
import { useSWRConfig } from "swr";
import Link from "next/link";
import { useUser } from "../utils/hooks/use-user";
const Navbar = () => {
  const { data } = useUser();

  return (
    <nav className="z-50 border border-teal-300 flex items-center p-1 sm:p-2 rounded-b-md bg-teal-100 sticky top-0">
      <div className="flex items-center  w-full">
        <div className="flex underline text-teal-800 basis-1/4">
          <Link href={data?.user ? "/personal" : "/"}>
            <a>
              <p className="font-semibold hover:text-teal-700">Movielist</p>
            </a>
          </Link>
        </div>
        {data?.username ? (
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
            mutate("/api/auth/getUser");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

const Default = () => {
  const { pathname, query } = useRouter();
  return (
    <>
      <div className="flex invisible sm:visible items-baseline tracking-tight basis-2/4 justify-center">
        <span className=" text-sm text-teal-800">Welcome to the&nbsp;</span>
        <span className=" font-semibold text-teal-900 ">
          {pathname === "/"
            ? "Home"
            : pathname.substring(1) === "list/[username]"
            ? query.username + "'s list"
            : pathname.substring(1)}
          &nbsp;
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
