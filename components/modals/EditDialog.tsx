import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import Modal from "./Modal";
import { scores } from "../../utils/consts";
import { MdClose } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

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

  const [Edits, setEdits] = useState({ scores: score, note: "" });

  useEffect(() => {
    console.log(score);
    setEdits({ scores: score || 0, note: note || "" });
  }, [score, note, setEdits, id, open]);

  const editEntry = async () => {
    try {
      const res = await sendRequest(
        `/api/list/entry/update/${id}`,
        "PATCH",
        JSON.stringify({ score: Edits.scores, note: Edits.note }),
        { "Content-Type": "application/json" }
      );
      setOpen(false);
      refreshList();
    } catch (error) {}
  };

  const Header = () => {
    return (
      <>
        {error ? (
          <div className="flex">
            <MdClose className="text-red-500 h-6 w-6 mr-2" />
            <div>An Error Has Occured</div>
          </div>
        ) : (
          <div className="flex">
            <AiOutlineEdit className="text-teal-500 h-6 w-6 mr-2" />
            <div>Editing {title}</div>
          </div>
        )}
      </>
    );
  };

  const Main = () => {
    return (
      <div className="flex-col w-full  border-b-2 border-teal-300">
        <div className="flex mb-4 border-b-2 border-teal-300 pb-1">
          <p className="text-md text-gray-700 mr-4 items-center flex p-1 pr-4 ">
            New score
          </p>
          <div className="flex flex-grow justify-center items-center p-1">
            <select
              className=" text-gray-700 p-1 "
              onChange={(e) => {
                setEdits({ ...Edits, scores: parseInt(e.target.value) });
                console.log("Score change event");
              }}
              value={Edits.scores}
            >
              <option value={0}>Select a score</option>
              {scores.map((i, index) => (
                <option key={index} value={i.id}>
                  {i.id + " - " + i.desc}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <form
            key="thisform"
            className="w-full max-w-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex-col items-center py-2 bg-white text-lg">
              <label htmlFor="note">
                <p className="text-base text-gray-700 pl-1 pb-1">Note</p>
              </label>
              <input
                className="appearance-none bg-transparent border-none w-full py-1 p-1 leading-tight focus:outline-none text-base"
                id="note"
                type="text"
                autoComplete="off"
                placeholder="Your note here..."
                onChange={(e) => setEdits({ ...Edits, note: e.target.value })}
                value={Edits.note === " " ? "" : Edits.note}
                autoFocus
              />
            </div>
          </form>
        </div>
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
              onClick={() => {
                setOpen(false);
                setEdits({ scores: 0, note: "" });
              }}
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
        !isLoading ? (
          error ? (
            <p className="text-md text-gray-700 basis-6/6 flex flex-grow text-left p-1">
              Something went wrong
            </p>
          ) : (
            <Main />
          )
        ) : (
          <LoadingBouncer style="w-full flex justify-center h-16 items-center text-teal-500" />
        )
      }
      buttons={<Buttons />}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default EditDialog;
