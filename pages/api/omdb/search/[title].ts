import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { errorHandler } from "../../../../utils/error-handling";
import HttpError from "../../../../utils/http-error";

export default async function searchMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const title = req.query.title;
    const response = await fetch(
      `https://omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}&type=movie`
    );
    const data = await response.json();
    if (data.Response === "False" || data.Response === undefined) {
      throw new HttpError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res);
  }
}
