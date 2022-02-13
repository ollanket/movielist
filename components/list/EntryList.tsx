import React from "react";
import { listEntry } from "../../types/types";
import ListBar from "./ListBar";
import ListItem from "./ListItem";

interface Props {
  controls: boolean;
  items: Array<listEntry>;
}

const EntryList = ({ controls, items }: Props) => {
  return (
    <>
      <ListBar />
      <div className="w-full h-full mt-0.5 border-l border-r border-teal-300">
        <div className="w-full">
          {items.map((entry) => (
            <ListItem key={entry.imdbId} entry={entry} />
          ))}
        </div>
        <div className="flex justify-center h-4  mb-2 mt-2 items-center">
          <span className="text-xs leading-tight text-gray-600 hidden sm:flex italic">
            The End
          </span>
        </div>
      </div>
    </>
  );
};

export default React.memo(EntryList);
