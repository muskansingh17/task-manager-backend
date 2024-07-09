import CustomError from "../errors/custom.error.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
