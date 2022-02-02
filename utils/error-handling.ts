import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";
import HttpError from "./http-error";

export const errorHandler = (err: unknown, res: NextApiResponse) => {
  const FaunaError = safeVerifyError(err, [
    "requestResult",
    "responseContent",
    "errors",
    0,
    "code"
  ]);

  if (FaunaError) {
    const faunaErr = err as any;
    return res
      .status(faunaErr.requestResult.statusCode)
      .json({ message: FaunaError });
  }

  if (err instanceof HttpError) {
    return res.status(err.errorCode).json({ message: err.message });
  }

  if (err instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: typeof err === "string" ? err : "Something went wrong" });
};

export const safeVerifyError: any = (error: any, keys: number[]) => {
  if (keys.length > 0) {
    if (error && error[keys[0]]) {
      const newError = error[keys[0]];
      keys.shift();
      return safeVerifyError(newError, keys);
    } else {
      return false;
    }
  }
  return error;
};
