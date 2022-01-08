import React from "react";

const Navbar = () => {
  // TODO: logic for showing Login button or your username
  const bol = false;

  return (
    <nav className="border border-teal-300 flex items-center justify-between p-4 rounded-b-md bg-teal-100 sticky top-0">
      <div className="flex items-center justify-between flex-nowrap">
        {bol ? (
          <div className="flex items-baseline flex-shrink-0 text-teal-700 mr-6">
            <span className="">logged in as:&nbsp;</span>
            <span className="text-xl tracking-tight font-semibold">
              Username
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button className="text-md px-4 py-2 leading-none border rounded text-teal-500 bg-white border-teal-300 hover:border-transparent hover:text-white hover:bg-teal-700">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
