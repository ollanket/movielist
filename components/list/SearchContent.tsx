/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md";
import { OMDbExactResponse } from "../../types/types";
import { useHttpClient } from "../../utils/hooks/http-hook";

interface Props {
  controls: boolean;
  imdbId: string | undefined;
}

const SearchContent = ({ controls, imdbId }: Props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [movie, setMovie] = useState<OMDbExactResponse | null>();
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
        console.log(res);
        setMovie(res);
      } catch (error) {}
    };
    fetchMovie();
  }, [imdbId, sendRequest]);

  return (
    <>
      {}
      {!isLoading && movie && (
        <div className="flex-col bg-white border-md rounded overflow-hidden border p-2">
          <div className="flex flex-row">
            <div className="sm:flex basis-3/12 hidden bg-teal-100">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : ""}
                alt="no img"
                className=" object-contain"
              ></img>
            </div>
            <div className="flex-col w-full sm:basis-9/12">
              <div className="flex bg-teal-100 font-semibold p-1 text-xl">
                <div className="ml-2">{movie.Title}</div>
                <div className="flex flex-grow justify-end">
                  <button
                    className="mr-3 underline appearance-none"
                    onClick={() => console.log("asd")}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className=" flex w-full p-1 ">
                <div className="flex flex-col justify-between w-full ">
                  <div className="p-0.5 ">
                    <p>Released: {movie.Released}</p>
                  </div>
                  <div className="p-0.5">
                    <p>Country: {movie.Country}</p>
                  </div>
                  <div className="p-0.5 hidden sm:flex">
                    <p>Awards: {movie.Awards}</p>
                  </div>
                  <div className="p-0.5 hidden sm:flex">
                    <p>BoxOffice: {movie.BoxOffice}</p>
                  </div>
                  <div className="p-0.5">
                    <p>Rating: {movie.Rated}</p>
                  </div>
                  <div className="p-0.5">
                    <p>Imdb Rating: {movie.imdbRating}</p>
                  </div>
                  <div className="p-0.5 hidden sm:flex">
                    <p>Metascore: {movie.Metascore}</p>
                  </div>
                  <div className="p-0.5">
                    <p>Language: {movie.Language}</p>
                  </div>
                  <div className="p-0.5 hidden sm:flex">
                    <p>Director: {movie.Director}</p>
                  </div>
                  <div className="p-0.5 hidden sm:flex">
                    <p>Actors: {movie.Actors}</p>
                  </div>
                  <div className="p-0.5">
                    <p>Genre: {movie.Genre}</p>
                  </div>
                  <div className="p-0.5">
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
          {Plot && (
            <div className="flex flex-wrap p-2 border-t border-teal-300">
              <p className=" leading-tight">
                {movie.Plot === "N/A" ? "" : movie.Plot}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchContent;
