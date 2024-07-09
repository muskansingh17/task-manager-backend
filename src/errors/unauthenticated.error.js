import CustomError from "./custom.error.js";

class UnauthenticatedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export default UnauthenticatedError;
