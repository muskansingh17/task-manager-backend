import { verifyToken } from "../utils/jwt.util.js";
import { findUserById } from "../repositories/user.repository.js";
import UnauthenticatedError from "../errors/unauthenticated.error.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthenticatedError("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      return next(new UnauthenticatedError("Invalid token"));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new UnauthenticatedError("Invalid token"));
  }
};
