/* eslint-disable @next/next/no-img-element */
import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md";
import { OMDbExactResponse } from "../../types/types";
import { useHttpClient } from "../../utils/hooks/http-hook";
import LoadingBouncer from "../LoadingBouncer";
import AddDialog from "../modals/AddDialog";

interface Props {
  controls: boolean;
  imdbId: string | undefined;
}

const SearchContent = ({ controls, imdbId }: Props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [movie, setMovie] = useState<OMDbExactResponse | null>();
  const [Plot, setPlot] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <>
      <AddDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title={movie?.Title}
        year={movie?.Year}
        poster={movie?.Poster}
        rated={movie?.Rated}
        imdbId={imdbId}
      />
      {isLoading && (
        <LoadingBouncer style="w-full flex justify-center items-center h-2/6 text-teal-500" />
      )}
      {!isLoading && movie && (
        <div className="flex-col bg-white border-md rounded border p-1.5">
          <div className="flex flex-row justify-evenly">
            <div className="sm:flex basis-3/12 hidden bg-teal-100">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : ""}
                alt="no img"
                className=" object-fill"
              ></img>
            </div>
            <div
              className="flex-col w-full sm:basis-9/12
            "
            >
              <div className="flex bg-teal-100 font-semibold p-1 text-xl">
                <div className="ml-2">{movie.Title}</div>
                {controls && (
                  <div className="flex flex-grow justify-end">
                    <button
                      className="mr-3 underline appearance-none"
                      onClick={() => setDialogOpen(true)}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className=" flex w-full p-1">
                <div className="flex flex-col justify-between w-full ">
                  <div className="p-1 ">
                    <p>Released: {movie.Released}</p>
                  </div>
                  <div className="p-1">
                    <p>Country: {movie.Country}</p>
                  </div>
                  <div className="p-1 hidden sm:flex">
                    <p>Awards: {movie.Awards}</p>
                  </div>
                  <div className="p-1 hidden sm:flex">
                    <p>BoxOffice: {movie.BoxOffice}</p>
                  </div>
                  <div className="p-1">
                    <p>Rating: {movie.Rated}</p>
                  </div>
                  <div className="mt-1 ml-1">
                    <p>Imdb Rating: {movie.imdbRating}</p>
                  </div>
                  <div className="mt-2 ml-1 hidden sm:flex">
                    <p>Metascore: {movie.Metascore}</p>
                  </div>
                  <div className="mt-2 ml-1">
                    <p>Language: {movie.Language}</p>
                  </div>
                  <div className="mt-2 ml-1 hidden sm:flex">
                    <p>Director: {movie.Director}</p>
                  </div>
                  <div className="mt-2 ml-1 hidden sm:flex">
                    <p>Actors: {movie.Actors}</p>
                  </div>
                  <div className="mt-2 ml-1">
                    <p>Genre: {movie.Genre}</p>
                  </div>
                  <div className="mt-2 ml-1">
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

                <div className="sm:hidden flex basis-7/12 ">
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
            <div className="flex flex-wrap p-2 mt-1">
              <p className=" leading-tight">
                {movie.Plot === "N/A" ? "" : movie.Plot}
              </p>
            </div>
          </Transition>
        </div>
      )}
    </>
  );
};

export default SearchContent;
