import { Transition } from "@headlessui/react";
import React, { useCallback, useEffect, useState } from "react";
import { listEntry, sortOptions } from "../../types/types";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import DeleteDialog from "../modals/DeleteDialog";
import Modal from "../modals/Modal";
import ListItem from "./ListItem";

interface Props {
  controls: boolean;
  items: Array<listEntry>;
  setList: React.Dispatch<React.SetStateAction<listEntry[]>>;
  username: string;
  setRefreshListRef: React.MutableRefObject<(() => Promise<void>) | undefined>;
}

interface selectedEntry {
  id: string;
  title: string;
}

const EntryList = ({
  controls,
  items,
  setList,
  username,
  setRefreshListRef
}: Props) => {
  const [sortState, setSortState] = useState<sortOptions>(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<selectedEntry | null>({
    title: "",
    id: ""
  });

  const sortList = async (sort: sortOptions) => {
    try {
      const res = await sendRequest(`/api/list/${username}?sort=${sort}`);
      const data: Array<listEntry> = res.data;
      setList(data);
    } catch (error) {}
  };

  const sortByTitle = async () => {
    setButtonsDisabled(true);
    const sort = sortState === 1 ? 0 : sortState !== 0 ? 0 : 1;
    await sortList(sort);
    setSortState(sort);
    setButtonsDisabled(false);
  };

  const sortByScore = async () => {
    setButtonsDisabled(true);
    const sort = sortState === 3 ? 2 : 3;
    await sortList(sort);
    setSortState(sort);
    setButtonsDisabled(false);
  };

  const sortByYear = async () => {
    setButtonsDisabled(true);
    const sort = sortState === 5 ? 4 : 5;
    await sortList(sort);
    setSortState(sort);
    setButtonsDisabled(false);
  };

  const refreshList = async () => {
    await sortList(sortState);
  };

  setRefreshListRef.current = refreshList;

  return (
    <>
      <DeleteDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        id={selectedEntry?.id}
        title={selectedEntry?.title}
        refreshList={refreshList}
      />
      <div className="flex w-full py-1 bg-teal-100 border rounded-t border-teal-300 text-teal-900">
        <div className="flex basis-1/12 justify-center items-center">img</div>
        <div className="flex basis-7/12 justify-center items-center">
          <button
            className="underline appearance-none transition ease-in-out delay-75 hover:text-teal-500 hover:scale-105"
            onClick={() => sortByTitle()}
            disabled={buttonsDisabled}
          >
            title
          </button>
        </div>
        <div className="flex basis-1/12 justify-center items-center">
          <button
            className="underline appearance-none transition ease-in-out delay-75 hover:text-teal-500 hover:scale-105"
            onClick={() => sortByScore()}
            disabled={buttonsDisabled}
          >
            score
          </button>
        </div>
        <div className="flex basis-1/12 justify-center items-center">
          <button
            className="underline appearance-none transition ease-in-out delay-75 hover:text-teal-500 hover:scale-105"
            onClick={() => sortByYear()}
            disabled={buttonsDisabled}
          >
            year
          </button>
        </div>
        <div className="flex basis-1/12 justify-center items-center">rated</div>
        <div className="flex basis-1/12 justify-center items-center">
          options
        </div>
      </div>

      <Transition
        show={!isLoading}
        enter="transition-opacity duration-[500ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-[500ms] ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full h-full mt-0.5 min-h-screen">
          <div className="w-full">
            {items.map((entry, i) => (
              <ListItem
                key={i}
                entry={entry}
                controls={controls}
                setDeleteDialog={setDeleteDialog}
                setSelectedEntry={setSelectedEntry}
              />
            ))}
          </div>
          {items.length !== 0 && (
            <div className="flex justify-center h-4  mb-4 mt-4 items-center">
              <span className="text-xs leading-tight text-gray-600 hidden sm:flex italic border-b">
                The End
              </span>
            </div>
          )}
        </div>
      </Transition>
    </>
  );
};

export default React.memo(EntryList);
