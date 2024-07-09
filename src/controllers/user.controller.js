import { asyncWrapper } from "../utils/async-wrapper.util.js";
import * as userService from "../services/user.service.js";

export const getUserProfile = asyncWrapper((req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getAllUserEmails = asyncWrapper(async (req, res) => {
  const emails = await userService.getAllUserEmails();
  res.status(200).json({
    success: true,
    data: emails,
  });
});
