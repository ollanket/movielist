/* eslint-disable @next/next/no-img-element */
import React from "react";
import { listEntry } from "../../types/types";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineInfo, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
interface Props {
  entry: listEntry;
  controls: boolean;
}

const ListItem = ({ entry, controls }: Props) => {
  return (
    <div className="flex w-full sm:h-24 h:16  border-b border-teal-300 overflow-visible rounded bg-white mt-0.5">
      <div className="flex basis-1/12">
        <img
          src={entry.poster !== "N/A" ? entry.poster : ""}
          alt="no img"
          className="flex w-full object-fill"
        ></img>
      </div>
      <div className="flex basis-7/12 items-center">
        <span className=" p-2 text-sm sm:text-lg">{entry.title}</span>
      </div>
      <div className="flex basis-1/12  items-center justify-center">
        <span className=" text-sm sm:text-lg">
          {entry.score !== 0 ? entry.score : " "}
        </span>
      </div>
      <div className="flex basis-1/12  items-center justify-center">
        <span className=" text-sm sm:text-lg">{entry.year}</span>
      </div>
      <div className="flex basis-1/12 items-center justify-center text-center">
        <span className=" text-sm sm:text-lg">{entry.rating}</span>
      </div>
      <div className="flex basis-1/12 items-center justify-center">
        <DropDown controls={controls} />
      </div>
    </div>
  );
};

export default ListItem;

function DropDown({ controls }: { controls: boolean }) {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left overflow-visible text-lg"
    >
      <div>
        <Menu.Button className=" z-0 mt-2 inline-flex justify-center w-full shadow-sm bg-white ">
          <HiOutlineDotsVertical />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" z-40 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <span
                  className={
                    active
                      ? "bg-gray-100 text-gray-900 block px-4 py-2 cursor-pointer"
                      : "text-gray-700 block px-4 py-2 text-sm"
                  }
                >
                  <div className="flex items-center">
                    <AiOutlineInfo className=" text-lg mr-1" />
                    <span className="pl-2 border-l-2 border-teal-300">
                      More Info
                    </span>
                  </div>
                </span>
              )}
            </Menu.Item>
            {controls && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <span
                      className={
                        active
                          ? "bg-gray-100 text-gray-900 block px-4 py-2 cursor-pointer"
                          : "text-gray-700 block px-4 py-2 text-sm"
                      }
                    >
                      <div className="flex items-center">
                        <AiOutlineDelete className=" text-lg mr-1" />
                        <span className="pl-2 border-l-2 border-teal-300">
                          Delete
                        </span>
                      </div>
                    </span>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <span
                      className={
                        active
                          ? "bg-gray-100 text-gray-900 block px-4 py-2 cursor-pointer"
                          : "text-gray-700 block px-4 py-2 text-sm"
                      }
                    >
                      <div className="flex items-center">
                        <AiOutlineEdit className=" text-lg mr-1" />
                        <span className="pl-2 border-l-2 border-teal-300">
                          Edit
                        </span>
                      </div>
                    </span>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
