import User from "../models/user.model.js";

export const getAllUsers = async () => {
  return await User.find({}, { email: true });
};

export const createUser = async (userDetails) => {
  const user = new User(userDetails);
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};
