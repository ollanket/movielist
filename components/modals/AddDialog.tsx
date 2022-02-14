import { Dispatch, SetStateAction, useState } from "react";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import { MdAdd, MdClose } from "react-icons/md";
import Modal from "./Modal";
import { scores } from "../../utils/consts";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refreshList: React.MutableRefObject<(() => Promise<void>) | undefined>;
  title: string | undefined;
  year: string | undefined;
  rated: string | undefined;
  poster: string | undefined;
  imdbId: string | undefined;
}

const AddDialog = ({
  open,
  setOpen,
  refreshList,
  title,
  year,
  rated,
  poster,
  imdbId
}: Props) => {
  const [score, setScore] = useState<number | null>(0);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const addEntry = async () => {
    try {
      const response = await sendRequest(
        `/api/list/entry/add`,
        "POST",
        JSON.stringify({
          title,
          year,
          rating: rated,
          poster,
          score,
          note: " ",
          imdbId
        }),
        { "Content-Type": "application/json" }
      );
      const refResh = refreshList.current;
      if (typeof refResh !== "undefined") {
        setOpen(false);
        await refResh();
      }
    } catch (error) {}
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      header={<Header title={title} error={error} />}
      main={
        isLoading ? (
          <LoadingBouncer style="w-full flex justify-center h-16 items-center text-teal-500" />
        ) : (
          <Main error={error} isLoading={isLoading} setScore={setScore} />
        )
      }
      buttons={
        <Buttons
          error={error}
          addEntry={addEntry}
          clearError={clearError}
          setOpen={setOpen}
        />
      }
    />
  );
};

export default AddDialog;

const Header = ({
  title,
  error
}: {
  title: string | undefined;
  error: string | null | undefined;
}) => {
  return (
    <>
      <div className="flex">
        {!error ? (
          <MdAdd className=" text-teal-500 h-6 w-6 mr-2" />
        ) : (
          <MdClose className=" text-red-500 h-6 w-6 mr-2" />
        )}
        {error ? `An Error Has Occured` : `Add ${title} to your list?`}
      </div>
    </>
  );
};

const Main = ({
  error,
  isLoading,
  setScore
}: {
  error: string | null | undefined;
  isLoading: boolean;
  setScore: Dispatch<SetStateAction<number | null>>;
}) => {
  return (
    <>
      {!error && !isLoading && (
        <>
          <div className="flex basis-3/6 items-center justify-center p-1">
            <select
              className=" text-gray-700 border-b-2 p-1 border-teal-300"
              onChange={(e) => setScore(parseInt(e.target.value))}
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
            optional
          </p>
        </>
      )}
      {error && (
        <p className="text-md text-gray-700 basis-3/6 flex flex-grow justify-center p-1">
          {error === "call error"
            ? "This Entry Is Already On Your List"
            : "Something Went Very Wrong"}
        </p>
      )}
    </>
  );
};

const Buttons = ({
  error,
  addEntry,
  clearError,
  setOpen
}: {
  error: string | null | undefined;
  addEntry: () => Promise<void>;
  clearError: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {!error && (
        <>
          <button
            onClick={async () => await addEntry()}
            className={`w-full sm:w-auto sm:text-sm font-medium inline-flex justify-center rounded-md text-base px-4 py-2 sm:ml-2 border hover:text-teal-500 hover:bg-white hover:border-teal-300 hover:border-transparent text-white bg-teal-700 `}
          >
            Add
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </>
      )}
      {error && (
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
