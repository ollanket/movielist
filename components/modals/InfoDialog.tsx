/* eslint-disable @next/next/no-img-element */
import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineInfo } from "react-icons/ai";
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md";
import { OMDbExactResponse } from "../../types/types";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import Modal from "./Modal";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  score: number | undefined;
  note: string | undefined;
  imdbId: string | undefined;
}

const InfoDialog = ({ open, setOpen, score, note, imdbId }: Props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [movie, setMovie] = useState<OMDbExactResponse | null>(null);
  const [Plot, setPlot] = useState(false);

  useEffect(() => {
    if (!imdbId) {
      return;
    }
    const fetchMovie = async () => {
      try {
        const res: OMDbExactResponse = await sendRequest(
          `/api/omdb/get/${imdbId}`
        );
        setMovie(res);
      } catch (error) {}
    };
    fetchMovie();
  }, [imdbId, sendRequest]);

  return (
    <Modal
      header={
        <>
          {error ? (
            <div className="flex">
              <MdClose className="text-red-500 h-6 w-6 mr-2" />
              <div>An Error Has Occured</div>
            </div>
          ) : (
            <div className="flex">
              <AiOutlineInfo className="text-teal-500 h-6 w-6 mr-2" />
              <div className="leading-normal items-center border-b-2 border-teal-300">
                Title: {movie?.Title}
              </div>
            </div>
          )}
        </>
      }
      main={
        <>
          {isLoading && (
            <LoadingBouncer style="w-full flex h-80 sm:h-96 justify-center items-center text-teal-500" />
          )}
          {!isLoading && movie && (
            <div className="flex-col border-md rounded border-2 -m-3 p-3 border-teal-100 text-gray-700 leading-tight sm:leading-normal">
              <div className="flex flex-row justify-evenly">
                <div className="basis-3/12 hidden bg-teal-100">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : ""}
                    alt="no img"
                    className=" object-fill"
                  ></img>
                </div>
                <div
                  className="flex-col w-full
            "
                >
                  <div className=" flex w-full">
                    <div className="flex flex-col justify-between w-full ">
                      <div className="p-0.5 ">
                        <p>Released: {movie.Released}</p>
                      </div>
                      <div className="p-0.5 ">
                        <p>Country: {movie.Country}</p>
                      </div>
                      <div className="p-0.5 hidden sm:flex">
                        <p>Awards: {movie.Awards}</p>
                      </div>
                      <div className="p-0.5 hidden sm:flex">
                        <p>BoxOffice: {movie.BoxOffice}</p>
                      </div>
                      <div className="p-0.5 ">
                        <p>Rating: {movie.Rated}</p>
                      </div>
                      <div className="p-0.5 ">
                        <p>Imdb Rating: {movie.imdbRating}</p>
                      </div>
                      <div className="p-0.5  hidden sm:flex">
                        <p>Metascore: {movie.Metascore}</p>
                      </div>
                      <div className="p-0.5 ">
                        <p>Language: {movie.Language}</p>
                      </div>
                      <div className="p-0.5 hidden sm:flex">
                        <p>Director: {movie.Director}</p>
                      </div>
                      <div className="p-0.5  hidden sm:flex">
                        <p>Actors: {movie.Actors}</p>
                      </div>
                      <div className="p-0.5 ">
                        <p>Genre: {movie.Genre}</p>
                      </div>
                      <div className="p-0.5 flex">
                        <p className="border-b-2 border-teal-300">
                          Users Score: {score}
                        </p>
                      </div>
                      <div className="p-0.5 flex">
                        <p className="border-b-2 border-teal-300 ">
                          Users note: {note === " " ? "N/A" : note}
                        </p>
                      </div>
                      <div className="p-0.5 ">
                        <div className="flex items-baseline">
                          Plot
                          <button
                            className="appearance-none place-self-end text-2xl"
                            onClick={() => setPlot((prevState) => !prevState)}
                          >
                            {Plot ? (
                              <MdOutlineKeyboardArrowUp />
                            ) : (
                              <MdOutlineKeyboardArrowDown />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex basis-7/12 ">
                      <img
                        src={movie.Poster !== "N/A" ? movie.Poster : ""}
                        alt="no img"
                        className=" object-contain place-self-start"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
              <Transition
                show={Plot}
                enter="transition-opacity duration-[300ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-[250ms]"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="flex flex-wrap p-2">
                  <p className=" leading-tight">
                    {movie.Plot === "N/A" ? "" : movie.Plot}
                  </p>
                </div>
              </Transition>
            </div>
          )}
        </>
      }
      buttons={
        <button
          className={`w-full sm:w-auto sm:text-sm font-medium inline-flex justify-center rounded-md text-base px-4 py-2 sm:ml-2 border hover:text-teal-500 hover:bg-white hover:border-teal-300 hover:border-transparent text-white bg-teal-700 `}
          onClick={() => {
            setOpen(false);
            setTimeout(clearError, 400);
          }}
        >
          Close
        </button>
      }
      setOpen={setOpen}
      open={open}
    />
  );
};

export default InfoDialog;
