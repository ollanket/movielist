import { ReasonPhrases, StatusCodes } from "http-status-codes";
import Joi from "joi";
import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

import validate from "../../../../lib/middlewares/validation";
import { faunaClient, getSecret } from "../../../../utils/auth";
import { errorHandler } from "../../../../utils/error-handling";
import HttpError from "../../../../utils/http-error";
import { listEntry } from "../../../../types/types";

const schema = Joi.object({
  title: Joi.string().required(),
  score: Joi.number().min(0).max(10).default(0),
  year: Joi.string().required(),
  note: Joi.string().default(" "),
  poster: Joi.string().default(" "),
  rating: Joi.string().required(),
  imdbId: Joi.string().required()
});

export default validate(
  { body: schema },
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method !== "POST") {
        throw new HttpError(
          ReasonPhrases.METHOD_NOT_ALLOWED,
          StatusCodes.METHOD_NOT_ALLOWED
        );
      }

      const faunaSecret = await getSecret(req);
      const { title, score, year, note, poster, rating, imdbId }: listEntry =
        await req.body;
      await faunaClient(faunaSecret).query(
        q.Call(q.Function("addEntry"), [
          title,
          score,
          year,
          rating,
          note,
          poster,
          imdbId
        ])
      );
      res
        .status(200)
        .json({ added: { title, score, year, note, poster, rating, imdbId } });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);
