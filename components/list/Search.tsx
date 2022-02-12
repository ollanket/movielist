/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import { MdClear } from "react-icons/md";
import { OMDbSearchResponse } from "../../types/types";

interface Props {
  controls: boolean;
}

const Search = ({ controls }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<OMDbSearchResponse["Search"] | undefined>(
    undefined
  );
  const [visible, setVisible] = useState(false);
  const controllerRef = useRef<AbortController | null>();

  useEffect(() => {
    if (search.length < 3) {
      setItems(undefined);
      return;
    }
    const getTitles = async (signal: AbortSignal | undefined) => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/omdb/search/${search}`, {
          signal
        });
        const data: OMDbSearchResponse = await res.json();
        console.log(data.Search);
        setItems(data.Search);
        setIsLoading(false);
        controllerRef.current = null;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setIsLoading(false);
          setItems(undefined);
        }
      }
    };

    if (controllerRef.current) {
      controllerRef.current.abort();
      console.log("aborted");
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    const timeOut = setTimeout(
      () => getTitles(controllerRef.current?.signal),
      500
    );

    return () => {
      controllerRef.current?.abort();
      clearTimeout(timeOut);
    };
  }, [search]);

  return (
    <div className="flex flex-grow-0 basis-1/6 z-50">
      <div className="flex flex-col w-full items-center justify-center bg-slate-500">
        <label
          htmlFor="search"
          className="flex  w-9/12 sm:w-6/12 justify-center items-center"
        >
          {isLoading ? (
            <div className="flex absolute w-2/3 sm:w-5/12 px-3 justify-end ml-6 pointer-events-none">
              <div
                className={`w-4 h-4 border-b-2 border-teal-700 rounded-full animate-spin`}
              ></div>
            </div>
          ) : (
            <div className="flex absolute w-2/3 sm:w-5/12 px-3 justify-end ml-6 pointer-events-none">
              <button
                className={` pointer-events-auto w-4 h-4`}
                onClick={() => setSearch("")}
              >
                <MdClear />
              </button>
            </div>
          )}
          <input
            id="search"
            type="search"
            autoComplete="off"
            placeholder="Search..."
            className="shadow appearance-none border rounded w-full py-2 px-3 p-1 font-medium text-lg leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
          ></input>
        </label>
        {items && visible && (
          <div className="flex flex-col overflow-visible invisible h-0 w-full sm:w-2/3">
            <div className="flex flex-col bg-white visible rounded-md p-1 sm:p-2 border border-teal-300 min-h-min mt-1">
              {items.map(({ Title, Year, Poster, imdbID }, i) => (
                <div
                  className=" cursor-pointer flex items-center border-t bg-white visible p-0.5 rounded-md hover:shadow-sm  transition ease-in-out delay-75 hover:scale-110 hover:border-0 hover:p-1 hover:bg-slate-100 duration-150"
                  onClick={() => setVisible(false)}
                  key={i}
                >
                  <div className="basis-2/12 sm:basis-1/12 h-16 sm:h-20">
                    <img
                      src={Poster}
                      alt="no img"
                      className="object-fill h-full w-full"
                    ></img>
                  </div>
                  <div className="basis-3/5 ml-3 flex justify-start">
                    Title: {Title}
                  </div>
                  <div className="basis-1/5 flex justify-end">Year: {Year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
