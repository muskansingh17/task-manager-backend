import CustomError from "./custom.error.js";

class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export default NotFoundError;
