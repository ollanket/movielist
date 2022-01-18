import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import React from "react";
import { serverClient } from "../../utils/auth";
import { query as q } from "faunadb";

interface listEntry {
  title: string;
  id: string;
  score: string;
  poster: string;
  year: string;
  rating: string;
  notes: string;
}

const List: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ list, username }) => {
  return (
    <div className="flex flex-col flex-grow bg-teal-200 h-full w-full justify-center items-center">
      <div className="flex flex-col flex-grow bg-teal-300 h-full w-full max-w-screen-sm sm:max-w-screen-lg">
        asd
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

    // const { data }: { data: Array<listEntry> } = await serverClient.query(
    //   q.Call(q.Function("asd"), username)
    // );

    const data: Array<listEntry> = [
      {
        title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
        id: "320674163978142281",
        score: "10",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTc0NTUwMTU5OV5BMl5BanBnXkFtZTcwNjAwNzQzMw@@._V1_SX300.jpg",
        year: "2005",
        rating: "PG",
        notes: "Nice Movie!",
      },
    ];

    console.log(data);
    return {
      props: { list: data, username: username },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return { redirect: { destination: "/", permanent: false } };
  }
};

export default List;