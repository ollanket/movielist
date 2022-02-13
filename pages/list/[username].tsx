import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType
} from "next";
import React, { useState } from "react";
import { serverClient } from "../../utils/auth";
import { query as q } from "faunadb";
import { listEntry } from "../../types/types";
import Search from "../../components/list/Search";
import EntryList from "../../components/list/EntryList";
import { useUser } from "../../utils/hooks/use-user";
import { useHttpClient } from "../../utils/hooks/http-hook";
import SearchContent from "../../components/list/SearchContent";

const List: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ list, username }) => {
  const { data } = useUser();
  const [listState, SetListState] = useState(list);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [mainItem, setMainItem] = useState<string | undefined>("");
  return (
    <div className="flex flex-col flex-grow bg-teal-50 h-full w-full justify-center items-center">
      <div className="flex flex-col flex-grow bg-white h-full w-full max-w-screen-sm sm:max-w-screen-lg">
        <Search setImdbId={setMainItem} />
        <SearchContent
          controls={data?.username === username}
          imdbId={mainItem}
        />
        <EntryList controls={data?.username === username} items={listState} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  list: listEntry[];
  username: string | string[];
}> = async (context) => {
  try {
    const { username } = context.query;

    if (!username) {
      throw new Error("No username in query");
    }

    const { data }: { data: Array<listEntry> } = await serverClient.query(
      q.Call(q.Function("getList"), [
        username,
        "movies_by_user_sort_by_title_asc"
      ])
    );

    // const data: Array<listEntry> = [
    //   {
    //     title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    //     id: "320674163978142281",
    //     score: 10,
    //     poster:
    //       "https://m.media-amazon.com/images/M/MV5BMTc0NTUwMTU5OV5BMl5BanBnXkFtZTcwNjAwNzQzMw@@._V1_SX300.jpg",
    //     year: "2005",
    //     rating: "PG",
    //     note: "Nice Movie!",
    //     added: "221187-2-1",
    //     imdbId: "dasd"
    //   }
    // ];
    return {
      props: { list: data, username: username }
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return { redirect: { destination: "/", permanent: false } };
  }
};

export default List;
