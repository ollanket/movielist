import { query as q } from "faunadb";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { serverClient, serializeCookie } from "../../utils/auth";
import { errorHandler } from "../../utils/error-handling";
import HttpError from "../../utils/http-error";

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
        password
      })
    );

    if (secret === undefined) {
      throw new HttpError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    res.setHeader("Set-Cookie", serializeCookie(secret));
    res.status(200).end();
  } catch (error) {
    errorHandler(error, res);
  }
}
