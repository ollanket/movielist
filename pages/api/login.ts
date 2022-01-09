import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { serverClient, serializeCookie } from "../../utils/auth";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = await req.body;

  try {
    if (!username || !password) {
      throw new Error("Email and password not provided");
    }

    const { secret }: { secret: string | undefined } = await serverClient.query(
      q.Login(q.Match(q.Index("users_by_username"), username), {
        password,
      })
    );

    if (secret === undefined) {
      throw new Error("No secret");
    }

    res.setHeader("Set-Cookie", serializeCookie(secret));
    res.status(200).end();
  } catch (error) {
    let message = "Unspecified error";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).send(message);
  }
}
