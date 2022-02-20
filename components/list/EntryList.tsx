import { Transition } from "@headlessui/react";
import { listenerCount } from "process";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInViewport } from "react-in-viewport";

import { listEntry, selectedEntry, sortOptions } from "../../types/types";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import DeleteDialog from "../modals/DeleteDialog";
import EditDialog from "../modals/EditDialog";
import InfoDialog from "../modals/InfoDialog";
import ListItem from "./ListItem";

interface Props {
  controls: boolean;
  items: Array<listEntry>;
  cursor: string | null;
  setCursor: React.Dispatch<React.SetStateAction<string | null>>;
  setList: React.Dispatch<React.SetStateAction<listEntry[]>>;
  username: string;
  setRefreshListRef: React.MutableRefObject<(() => Promise<void>) | undefined>;
}

const EntryList = ({
  controls,
  items,
  cursor,
  setCursor,
  setList,
  username,
  setRefreshListRef
}: Props) => {
  const [sortState, setSortState] = useState<sortOptions>(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [infoDialog, setInfoDialog] = useState<boolean>(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<selectedEntry | null>({
    title: "",
    id: "",
    score: 0,
    note: "",
    imdbId: ""
  });

  const sortList = async (sort: sortOptions) => {
    try {
      const res = await sendRequest(`/api/list/${username}?sort=${sort}`);
      const movies: Array<listEntry> = res.data.movies;
      const cursor: string | null = res.data.cursor;
      setCursor(cursor);
      setList(movies);
    } catch (error) {}
  };

  // Sorts

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

  // No need to resort list when removing entries.

  const handleEntryDelete = (toRemove: string) => {
    setList(items.filter(({ id }) => id !== toRemove));
  };

  // refreshlist, used by editDialog. We refresh the list incase
  // sort order changes as sorting is done db side

  const refreshList = async () => {
    window["scrollTo"]({ top: 0, behavior: "smooth" });
    await sortList(sortState);
  };

  setRefreshListRef.current = refreshList;

  // Load next page when reaching the bottom of the page.
  // Could be easily changed to load when x index of list comes in viewport for seamless data fetching.

  const viewPortRef = useRef<HTMLDivElement | null>(null);
  const [cursorError, setCursorError] = useState<string | null>(null);

  const { inViewport, enterCount, leaveCount } = useInViewport(
    viewPortRef,
    undefined,
    { disconnectOnLeave: false },
    {
      onEnterViewport: async () => {
        if (cursor === null) {
          return;
        }
        try {
          const response = await fetch(
            `/api/list/${username}?sort=${sortState}&cursor=${cursor}`
          );
          const nextList = await response.json();
          setList(items.concat(nextList.data.movies));
          setCursor(nextList.data.cursor);
        } catch (error) {
          setCursorError("Error loading more entries");
        }
      }
    }
  );

  return (
    <>
      {controls && (
        <>
          <EditDialog
            open={editDialog}
            setOpen={setEditDialog}
            id={selectedEntry?.id}
            title={selectedEntry?.title}
            refreshList={refreshList}
            score={selectedEntry?.score}
            note={selectedEntry?.note}
          />
          <DeleteDialog
            open={deleteDialog}
            setOpen={setDeleteDialog}
            id={selectedEntry?.id}
            title={selectedEntry?.title}
            refreshList={refreshList}
            getUpdatedList={handleEntryDelete}
          />
        </>
      )}
      <InfoDialog
        open={infoDialog}
        setOpen={setInfoDialog}
        score={selectedEntry?.score}
        note={selectedEntry?.note}
        imdbId={selectedEntry?.imdbId}
      />
      <div className="flex w-full py-1 bg-teal-100 border rounded-t border-teal-300 text-teal-900 text-xs sm:text-base">
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
        <div className="flex basis-2/12 sm:basis-1/12 justify-center items-center">
          <button
            className="underline appearance-none transition ease-in-out delay-75 hover:text-teal-500 hover:scale-105"
            onClick={() => sortByYear()}
            disabled={buttonsDisabled}
          >
            year
          </button>
        </div>
        <div className="sm:flex basis-1/12 justify-center items-center hidden">
          rated
        </div>
        <div className="flex basis-1/12 justify-center items-center">
          options
        </div>
      </div>

      <Transition
        show={!isLoading}
        unmount={false}
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
                setEditDialog={setEditDialog}
                setInfoDialog={setInfoDialog}
              />
            ))}
          </div>

          <div
            className="flex justify-center h-4  mb-4 mt-4 items-center"
            ref={viewPortRef}
          >
            {cursor && !cursorError && (
              <LoadingBouncer style="w-full flex justify-center items-center text-teal-500" />
            )}

            {!cursor && !cursorError && (
              <span className="text-xs leading-tight text-gray-600 flex italic border-b">
                {items.length === 0 ? "Your List Is Empty" : "The End"}
              </span>
            )}

            {cursorError && (
              <span className="text-xs leading-tight text-gray-600 flex italic border-b">
                cursorError
              </span>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default React.memo(EntryList);
