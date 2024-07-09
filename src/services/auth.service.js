import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import { hashPassword, comparePasswords } from "../utils/hash.util.js";
import { generateToken } from "../utils/jwt.util.js";
import BadRequestError from "../errors/bad-request.error.js";
import UnauthorizedError from "../errors/unauthorized.js";

export const registerUser = async ({ name, email, password }) => {
  let user = await findUserByEmail(email);
  if (user) {
    throw new BadRequestError("User already exists");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await createUser({ name, email, password: hashedPassword });

  delete newUser.password;

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Wrong Password");
  }

  const token = generateToken({ id: user._id });
  return token;
};
