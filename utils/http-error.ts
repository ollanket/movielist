import { StatusCodes } from "http-status-codes";

export default class HttpError extends Error {
  errorCode: StatusCodes;
  constructor(message: string, errorCode: StatusCodes) {
    super(message);
    this.errorCode = errorCode;
  }
}
