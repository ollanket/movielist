import { NextApiRequest, NextApiResponse } from "next";
import { listEntry, ref, sortOptions } from "../../../types/types";
import { serverClient } from "../../../utils/auth";
import { query as q } from "faunadb";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import HttpError from "../../../utils/http-error";
import { errorHandler } from "../../../utils/error-handling";

export default async function getList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { uid, sort, cursor } = req.query;

    if (req.method !== "GET") {
      throw new HttpError(
        ReasonPhrases.METHOD_NOT_ALLOWED,
        StatusCodes.METHOD_NOT_ALLOWED
      );
    }
    const {
      data,
      after
    }: { data: Array<listEntry>; after: Array<ref | string> | undefined } =
      await serverClient.query(
        q.Call(q.Function("getList"), [
          `${uid}`,
          sortOptions[parseInt(sort?.toString()) || 0]
        ])
      );
    res.status(StatusCodes.OK).json({ data, after });
  } catch (error) {
    errorHandler(error, res);
  }
}
