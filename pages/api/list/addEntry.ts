import { ReasonPhrases, StatusCodes } from "http-status-codes";
import Joi from "joi";
import cookie from "cookie";
import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

import validate from "../../../lib/middlewares/validation";
import { faunaClient, FAUNA_SECRET_COOKIE } from "../../../utils/auth";
import { errorHandler } from "../../../utils/error-handling";
import HttpError from "../../../utils/http-error";

const schema = Joi.object({
  title: Joi.string().required(),
  score: Joi.number().min(0).max(10).default(0),
  year: Joi.string().required(),
  note: Joi.string().default(" "),
  poster: Joi.string().default(" ")
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
      const cookies = cookie.parse(req.headers.cookie ?? "");
      const faunaSecret = cookies[FAUNA_SECRET_COOKIE];
      if (!faunaSecret) {
        throw new HttpError(
          ReasonPhrases.UNAUTHORIZED,
          StatusCodes.UNAUTHORIZED
        );
      }
      const { title, score, year, note, poster } = req.body;
      await faunaClient(faunaSecret).query(
        q.Call(q.Function("addEntry"), [title, score, year, note, poster])
      );
      res.status(200).json({ added: { title, score, year, note, poster } });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);
