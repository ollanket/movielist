import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { faunaClient, FAUNA_SECRET_COOKIE } from "../../utils/auth";
import cookie from "cookie";

export default async function getCurrentUserName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = cookie.parse(req.headers.cookie ?? "");
  const faunaSecret = cookies[FAUNA_SECRET_COOKIE];

  if (!faunaSecret) {
    return res.status(200).json({ user: false });
  }

  try {
    const { data }: { data: { username: string } } = await faunaClient(
      faunaSecret
    ).query(q.Get(q.CurrentIdentity()));

    console.log("asd");
    res.status(200).json({ username: data.username, user: true });
  } catch (error) {
    let message = "Unspecified error";
    if (error instanceof Error) {
      message = error.message;
    }
    console.log(message);
    res.status(500).send(message);
  }
}
