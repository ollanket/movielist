import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import Modal from "./Modal";
import { scores } from "../../utils/consts";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id?: string | undefined;
  title?: string | undefined;
  refreshList: () => Promise<void>;
  score: number | undefined;
  note: string | undefined;
}

const EditDialog = ({
  open,
  setOpen,
  id,
  title,
  refreshList,
  score,
  note
}: Props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [Edits, setEdits] = useState({ score: score, note: note });

  useEffect(() => {
    setEdits({ score: score, note: note });
  }, [score, note, setEdits]);

  const editEntry = async () => {
    try {
      const res = await sendRequest(
        `/api/list/entry/update/${id}`,
        "PATCH",
        { score, note },
        { "Content-Type": "application/json" }
      );
      setOpen(false);
      refreshList();
    } catch (error) {}
  };

  const Header = () => {
    return <div>Header</div>;
  };

  const Main = () => {
    return (
      <div className="flex-col w-full">
        <div className="flex bg-slate-50">
          <div className="flex basis-3/6 items-center justify-center p-1">
            <select
              className=" text-gray-700 border-b-2 p-1 border-teal-300"
              onChange={(e) => {
                setEdits({ ...Edits, score: parseInt(e.target.value) });
                console.log("Score change event");
              }}
              value={Edits.score}
            >
              <option value={0}>Select a score</option>
              {scores.map((i, index) => (
                <option key={index} value={i.id}>
                  {i.id + " - " + i.desc}
                </option>
              ))}
            </select>
          </div>
          <p className="text-md text-gray-700 basis-3/6 flex flex-grow justify-center p-1">
            Give new score
          </p>
        </div>
        <div className="flex bg-red-100 mt-4">asd</div>
      </div>
    );
  };

  const Buttons = () => {
    return (
      <>
        {!error ? (
          <>
            <button
              onClick={async () => await editEntry()}
              className={`w-full sm:w-auto sm:text-sm font-medium inline-flex justify-center rounded-md text-base px-4 py-2 sm:ml-2 border hover:text-teal-500 hover:bg-white hover:border-teal-300 hover:border-transparent text-white bg-teal-700`}
            >
              Edit
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className={`w-full sm:w-auto sm:text-sm font-medium inline-flex justify-center rounded-md text-base px-4 py-2 sm:ml-2 border hover:text-teal-500 hover:bg-white hover:border-teal-300 hover:border-transparent text-white bg-teal-700 `}
            onClick={() => {
              setOpen(false);
              setTimeout(clearError, 400);
            }}
          >
            Ok
          </button>
        )}
      </>
    );
  };

  return (
    <Modal
      header={<Header />}
      main={
        isLoading ? (
          <LoadingBouncer style="w-full flex justify-center h-16 items-center text-teal-500" />
        ) : (
          <Main />
        )
      }
      buttons={<Buttons />}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default EditDialog;
