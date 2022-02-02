import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { faunaClient, getSecret } from "../../../../../utils/auth";
import HttpError from "../../../../../utils/http-error";
import { errorHandler } from "../../../../../utils/error-handling";

export default async function deleteEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { mid } = req.query;

    if (req.method !== "DELETE") {
      throw new HttpError(
        ReasonPhrases.METHOD_NOT_ALLOWED,
        StatusCodes.METHOD_NOT_ALLOWED
      );
    }
    const faunaSecret = await getSecret(req);

    await faunaClient(faunaSecret).query(
      q.Call(q.Function("deleteEntry"), mid)
    );

    res.status(StatusCodes.OK).json({ message: "deleted succesfully" });
  } catch (error) {
    errorHandler(error, res);
  }
}
