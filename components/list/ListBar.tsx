import React from "react";

const ListBar = () => {
  return (
    <div className="flex w-full py-1 bg-teal-100 border rounded-t border-teal-300 text-teal-900">
      <div className="flex basis-1/12 justify-center items-center">
        <span className=" appearance-none transition">img</span>
      </div>
      <div className="flex basis-7/12 justify-center items-center">
        <button className="underline appearance-none transition ease-in-out delay-75 hover:text-teal-500 hover:scale-105">
          title
        </button>
      </div>
      <div className="flex basis-1/12 justify-center items-center">
        <button className="underline appearance-none transition ease-in-out delay-75 hover:text-teal-500 hover:scale-105">
          score
        </button>
      </div>
      <div className="flex basis-1/12 justify-center items-center">
        <button className="underline appearance-none transition ease-in-out delay-75 hover:text-teal-500 hover:scale-105">
          year
        </button>
      </div>
      <div className="flex basis-1/12 justify-center items-center">
        <span className="">rated</span>
      </div>
      <div className="flex basis-1/12 justify-center items-center">
        <span className=" appearance-none">options</span>
      </div>
    </div>
  );
};

export default ListBar;
