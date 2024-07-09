import CustomError from "./custom.error.js";

class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export default BadRequestError;
