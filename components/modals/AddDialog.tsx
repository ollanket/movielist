import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { scores } from "../../utils/consts";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import { MdAdd, MdClose } from "react-icons/md";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string | undefined;
  year: string | undefined;
  rated: string | undefined;
  poster: string | undefined;
  imdbId: string | undefined;
}

const AddDialog = ({
  open,
  setOpen,
  title,
  year,
  rated,
  poster,
  imdbId
}: Props) => {
  const [score, setScore] = useState<number | null>(0);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const addEntry = async () => {
    console.log(title, year, rated, poster, score, imdbId);
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
      setOpen(false);
      console.log(response);
    } catch (error) {}
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:border-teal-300 sm:border-2">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left sm:w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900 "
                    >
                      <div className="flex">
                        {!error ? (
                          <MdAdd className=" text-teal-500 h-6 w-6 mr-2" />
                        ) : (
                          <MdClose className=" text-red-500 h-6 w-6 mr-2" />
                        )}
                        {error
                          ? `An Error Has Occured`
                          : `Add ${title} to your list?`}
                      </div>
                    </Dialog.Title>
                    <div className="mt-2 sm:mt-6 sm:mb-2 p-1 flex w-full ">
                      {isLoading && (
                        <LoadingBouncer style="w-full flex justify-center h-16 items-center text-teal-500" />
                      )}
                      {!error && !isLoading && (
                        <>
                          <div className="flex basis-3/6 items-center justify-center p-1">
                            <select
                              className=" text-gray-700 border-b-2 p-1 border-teal-300"
                              onChange={(e) =>
                                setScore(parseInt(e.target.value))
                              }
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddDialog;
