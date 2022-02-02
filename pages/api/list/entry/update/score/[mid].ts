import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { faunaClient, getSecret } from "../../../../../../utils/auth";
import HttpError from "../../../../../../utils/http-error";
import { errorHandler } from "../../../../../../utils/error-handling";
import validate from "../../../../../../lib/middlewares/validation";
import Joi from "joi";

const schema = Joi.object({
  score: Joi.number().min(0).max(10)
});

export default validate(
  { body: schema },
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        query: { mid },
        body: { score }
      } = req;

      if (req.method !== "PATCH") {
        throw new HttpError(
          ReasonPhrases.METHOD_NOT_ALLOWED,
          StatusCodes.METHOD_NOT_ALLOWED
        );
      }
      const faunaSecret = await getSecret(req);

      const {
        data: { title, newScore, year, rating, note }
      }: {
        data: {
          title: string;
          newScore: number;
          year: string;
          rating: string;
          note: string;
        };
      } = await faunaClient(faunaSecret).query(
        q.Call(q.Function("updateScore"), [score, mid])
      );

      res.status(StatusCodes.OK).json({
        updated: { title, score: newScore, year, rating, note }
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);
