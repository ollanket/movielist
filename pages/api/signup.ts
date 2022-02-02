import { query as q } from "faunadb";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import validate from "../../lib/middlewares/validation";
import { ref } from "../../types/types";
import { serverClient } from "../../utils/auth";
import { errorHandler } from "../../utils/error-handling";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required(),
  password: Joi.string().min(3).max(24).required()
});

export default validate(
  { body: schema },
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { username, password } = await req.body;

      const { ref }: { ref: ref | undefined } = await serverClient.query(
        q.Create(q.Collection("users"), {
          credentials: { password },
          data: { username }
        })
      );

      if (ref === undefined) {
        throw new Error("No ref");
      }

      res.status(200).end();
    } catch (error) {
      errorHandler(error, res);
    }
  }
);
