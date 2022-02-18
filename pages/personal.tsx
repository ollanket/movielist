import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from "next";
import Link from "next/link";
import { useUser } from "../utils/hooks/use-user";
import TextLink from "../components/TextLink";
import { faunaClient, FAUNA_SECRET_COOKIE } from "../utils/auth";
import cookie from "cookie";
import { query } from "faunadb";
import { ref } from "../types/types";

const Personal: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center w-full text-center p-3 h-full">
      <h1 className=" text-6xl font-bold text-teal-800">
        Welcome to the movielist demo site!
      </h1>
      <p className=" mt-3 text-2xl text-teal-700">{`Welcome ${username}`}</p>

      <div className="flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full">
        <TextLink
          href={`/list/${username}`}
          heading="Your list"
          paragraph="Checkout your list"
        />

        <TextLink
          href="/list/testi2"
          heading="Example"
          paragraph="Checkout an example movielist"
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  username: string;
}> = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie ?? "");
    const faunaSecret = cookies[FAUNA_SECRET_COOKIE];
    if (!faunaSecret) {
      throw new Error("No Secre");
    }

    const response: {
      ref?: ref;
      data?: { username: string };
    } = await faunaClient(faunaSecret).query(
      query.Get(query.CurrentIdentity())
    );

    if (!response.ref || !response.data) {
      throw new Error("No Response");
    }

    return {
      props: { username: response.data.username }
    };
  } catch (error) {
    return { redirect: { destination: "/", permanent: false } };
  }
};

export default Personal;
