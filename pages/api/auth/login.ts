import { query as q } from "faunadb";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import validate from "../../../lib/middlewares/validation";
import { serverClient, serializeCookie } from "../../../utils/auth";
import { errorHandler } from "../../../utils/error-handling";
import HttpError from "../../../utils/http-error";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required(),
  password: Joi.string().min(3).max(24).required()
});

export default validate(
  { body: schema },
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { username, password } = await req.body;
      const { secret }: { secret: string | undefined } =
        await serverClient.query(
          q.Login(q.Match(q.Index("users_by_username"), username), {
            password
          })
        );
      if (secret === undefined) {
        throw new HttpError(
          ReasonPhrases.UNAUTHORIZED,
          StatusCodes.UNAUTHORIZED
        );
      }
      res.setHeader("Set-Cookie", serializeCookie(secret));
      res.status(200).end();
    } catch (error) {
      errorHandler(error, res);
    }
  }
);
