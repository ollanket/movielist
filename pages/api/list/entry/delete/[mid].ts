import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import cookie from "cookie";

import { faunaClient, FAUNA_SECRET_COOKIE } from "../../../../../utils/auth";
import HttpError from "../../../../../utils/http-error";
import { errorHandler } from "../../../../../utils/error-handling";

export default async function getList(
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

    const cookies = cookie.parse(req.headers.cookie ?? "");
    const faunaSecret = cookies[FAUNA_SECRET_COOKIE];
    if (!faunaSecret) {
      throw new HttpError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    await faunaClient(faunaSecret).query(
      q.Call(q.Function("deleteEntry"), mid)
    );

    res.status(StatusCodes.OK).json({ message: "deleted succesfully" });
  } catch (error) {
    errorHandler(error, res);
  }
}
