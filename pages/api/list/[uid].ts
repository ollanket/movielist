import { NextApiRequest, NextApiResponse } from "next";
import { listEntry, ref, sortOptions } from "../../../types/types";
import { serverClient } from "../../../utils/auth";
import { query as q } from "faunadb";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import HttpError from "../../../utils/http-error";
import { errorHandler } from "../../../utils/error-handling";

export interface response {
  movies: Array<listEntry>;
  cursor: Array<ref | number | string> | null;
}

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
    let resolvedCursor;

    if (cursor) {
      const resolvedString = Buffer.from(cursor as string, "base64").toString(
        "ascii"
      );
      const { first, second, third } = JSON.parse(resolvedString);
      resolvedCursor = [first, second, third];
    }

    const data: response = await serverClient.query(
      q.Call(q.Function("getList2"), [
        `${uid}`,
        sortOptions[parseInt(sort?.toString()) || 0],
        resolvedCursor ? resolvedCursor : null
      ])
    );

    const base64 = data.cursor
      ? Buffer.from(
          JSON.stringify({
            first: data.cursor[0],
            second: data.cursor[1],
            third: data.cursor[2]
          })
        ).toString("base64")
      : null;

    res.status(200).json({ data: { movies: data.movies, cursor: base64 } });
  } catch (error) {
    errorHandler(error, res);
  }
}
