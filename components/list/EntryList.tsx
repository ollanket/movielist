import React from "react";
import { listEntry } from "../../types/types";

interface Props {
  controls: boolean;
  items: Array<listEntry>;
}

const EntryList = ({ controls, items }: Props) => {
  return <div className="z-0">EntryList</div>;
};

export default EntryList;
