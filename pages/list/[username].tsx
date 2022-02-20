import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType
} from "next";
import React, { useEffect, useRef, useState } from "react";
import { serverClient } from "../../utils/auth";
import { query as q } from "faunadb";
import { listEntry } from "../../types/types";
import Search from "../../components/list/Search";
import EntryList from "../../components/list/EntryList";
import { useUser } from "../../utils/hooks/use-user";
import SearchContent from "../../components/list/SearchContent";

const List: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ list, username, cursor }) => {
  const { data } = useUser();
  const [listState, SetListState] = useState(list);
  const [cursorState, setCursorState] = useState(cursor);
  const [mainItem, setMainItem] = useState<string | undefined>("");
  const refreshList = useRef<() => Promise<void>>();

  return (
    <div className="flex flex-col flex-grow bg-teal-50 h-full w-full justify-center items-center">
      <div className="flex flex-col flex-grow bg-white h-full w-full max-w-screen-sm sm:max-w-screen-lg">
        <Search setImdbId={setMainItem} />
        <SearchContent
          controls={data?.username === username}
          imdbId={mainItem}
          refreshList={refreshList}
        />
        <EntryList
          controls={data?.username === username}
          items={listState}
          setList={SetListState}
          cursor={cursorState}
          setCursor={setCursorState}
          username={username as string}
          setRefreshListRef={refreshList}
        />
      </div>
    </div>
  );
};

interface response {
  movies: Array<listEntry>;
  cursor: string | null;
}

export const getServerSideProps: GetServerSideProps<{
  list: listEntry[];
  username: string | string[];
  cursor: string | null;
}> = async (context) => {
  try {
    const { username } = context.query;

    if (!username) {
      throw new Error("No username in query");
    }
    const data: response = await serverClient.query(
      q.Call(q.Function("getList2"), [
        username,
        "movies_by_user_sort_by_title_asc2",
        null
      ])
    );

    const base64 = data.cursor
      ? Buffer.from(
          JSON.stringify({
            first: data.cursor[0],
            second: data.cursor[1],
            third: data.cursor[2]
          })
        ).toString("base64")
      : null;

    return {
      props: {
        list: data.movies,
        username: username,
        cursor: base64
      }
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return { redirect: { destination: "/", permanent: false } };
  }
};

export default List;
