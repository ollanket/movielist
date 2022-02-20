import { Dispatch, SetStateAction } from "react";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import { MdClose } from "react-icons/md";
import Modal from "./Modal";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id?: string | undefined;
  title?: string | undefined;
  refreshList: () => Promise<void>;
  getUpdatedList: (toRemove: string) => void;
}

const DeleteDialog = ({
  open,
  setOpen,
  id,
  title,
  refreshList,
  getUpdatedList
}: Props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const removeEntry = async () => {
    try {
      const response = await sendRequest(
        `/api/list/entry/delete/${id}`,
        "DELETE"
      );
      setOpen(false);
      //await refreshList();
      getUpdatedList(id!);
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
          <Main error={error} />
        )
      }
      buttons={
        <Buttons
          error={error}
          removeEntry={removeEntry}
          clearError={clearError}
          setOpen={setOpen}
        />
      }
    />
  );
};

export default DeleteDialog;

const Header = ({
  title,
  error
}: {
  title: string | undefined;
  error: string | null | undefined;
}) => {
  return (
    <>
      {error ? (
        <div className="flex">
          <MdClose className="text-red-500 h-6 w-6 mr-2" />
          <div>An Error Has Occured</div>
        </div>
      ) : (
        <div className="flex">
          <AiOutlineDelete className="text-red-500 h-6 w-6 mr-2" />
          <div>Delete {title}?</div>
        </div>
      )}
    </>
  );
};

const Main = ({ error }: { error: string | null | undefined }) => {
  return (
    <p className="text-md text-gray-700 basis-6/6 flex flex-grow text-left p-1">
      {error ? "Something Went Wrong" : "Are you sure?"}
    </p>
  );
};

const Buttons = ({
  error,
  removeEntry,
  clearError,
  setOpen
}: {
  error: string | null | undefined;
  removeEntry: () => Promise<void>;
  clearError: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {!error ? (
        <>
          <button
            onClick={async () => await removeEntry()}
            className={`w-full sm:w-auto sm:text-sm font-medium inline-flex justify-center rounded-md text-base px-4 py-2 sm:ml-2 border  hover:bg-red-600 hover:border-transparent text-white bg-red-500 `}
          >
            Delete
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
