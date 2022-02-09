import React from "react";
import { listEntry } from "../../types/types";

interface Props {
  controls: boolean;
  items: Array<listEntry>;
}

const EntryList = ({ controls, items }: Props) => {
  return <div>EntryList</div>;
};

export default EntryList;
