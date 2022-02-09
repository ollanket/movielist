import { NextApiRequest, NextApiResponse } from "next";
import { errorHandler } from "../../../../utils/error-handling";
import HttpError from "../../../../utils/http-error";

export default async function getMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const imdbID = req.query.imdbID;
    const response = await fetch(
      `https://omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}&type=movie&plot=full`
    );
    const data = await response.json();
    if (data.Response === "False" || data.Response === undefined) {
      throw new HttpError("Not Found", 404);
    }
    return res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res);
  }
}
