import * as userRepository from "../repositories/user.repository.js";

export const getAllUserEmails = async () => {
  const users = await userRepository.getAllUsers();
  const emails = users.map((user) => ({ _id: user._id, email: user.email }));
  return emails;
};
