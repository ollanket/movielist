import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { faunaClient, getSecret } from "../../../../../../utils/auth";
import HttpError from "../../../../../../utils/http-error";
import { errorHandler } from "../../../../../../utils/error-handling";
import validate from "../../../../../../lib/middlewares/validation";
import Joi from "joi";

const schema = Joi.object({
  note: Joi.string().required().alphanum()
});

export default validate(
  { body: schema },
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        query: { mid },
        body: { note }
      } = req;

      if (req.method !== "PATCH") {
        throw new HttpError(
          ReasonPhrases.METHOD_NOT_ALLOWED,
          StatusCodes.METHOD_NOT_ALLOWED
        );
      }
      const faunaSecret = await getSecret(req);

      const {
        data: { title, score, year, rating, newNote }
      }: {
        data: {
          title: string;
          score: number;
          year: string;
          rating: string;
          newNote: string;
        };
      } = await faunaClient(faunaSecret).query(
        q.Call(q.Function("updateNotes"), [note, mid])
      );

      res.status(StatusCodes.OK).json({
        updated: { title, score, year, rating, note: newNote }
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);
