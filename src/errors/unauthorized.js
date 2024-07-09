import CustomError from "./custom.error.js";

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 403);
  }
}

export default UnauthorizedError;
