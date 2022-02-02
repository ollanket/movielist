import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { serverClient } from "../../utils/auth";
import { errorHandler } from "../../utils/error-handling";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = await req.body;

  try {
    if (!username || !password) {
      throw new Error("Email and password not provided");
    }

    const { ref }: { ref: object | undefined } = await serverClient.query(
      q.Create(q.Collection("users"), {
        credentials: { password },
        data: { username }
      })
    );

    if (ref === undefined) {
      throw new Error("No ref");
    }

    res.status(200).json({
      succesful: true,
      ts: `${+new Date()}`
    });
  } catch (error) {
    errorHandler(error, res);
  }
}
