import React, { useState, useEffect, useRef } from "react";
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
      console.log("something");
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
    <div className="flex bg-gray-500 items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search"
          className="shadow appearance-none border rounded w-2/3 sm:w-2/5 py-2 px3 p-1 font-medium text-lg leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        {items && (
          <div>
            <ul>
              {items.map(({ Title, Year, Poster, imdbID }, i) => (
                <li key={i}>Title: {Title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
