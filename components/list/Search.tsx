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
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2 bg-white border rounded-md text-lg">
            <input
              className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setVisible(true)}
              onBlur={() => setVisible(false)}
            />
            {isLoading ? (
              <div className="flex-shrink-0 py-1 px-2 pr-3">
                <div
                  className={`w-4 h-4 border-b-2 border-teal-700 rounded-full animate-spin`}
                ></div>
              </div>
            ) : (
              <button
                className="flex-shrink-0 border-transparent pr-3 text-teal-800 hover:text-black text-md py-1 px-2 rounded"
                type="button"
                onClick={() => setSearch("")}
              >
                <MdClear />
              </button>
            )}
          </div>
        </form>
        {items && visible && (
          <div className="flex flex-col overflow-visible invisible h-0 w-full sm:w-2/3">
            <div className="flex flex-col bg-white visible rounded-md p-1 sm:p-2 border border-teal-300 mt-1">
              {items.map(({ Title, Year, Poster, imdbID }, i) => (
                <div
                  className={`cursor-pointer flex md:flex items-center border-t bg-white ${
                    i < 5 ? "visible" : "hidden"
                  } md:visible p-0.5 rounded-md hover:shadow-sm  transition ease-in-out delay-75 hover:scale-110 hover:border-0 hover:p-1 hover:bg-slate-100 duration-150 `}
                  onClick={() => setVisible(false)}
                  key={i}
                >
                  <div className="basis-2/12 sm:basis-1/12 h-16 sm:h-20">
                    <img
                      src={Poster === "N/A" ? "" : Poster}
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
