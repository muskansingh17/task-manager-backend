import { registerUser, loginUser } from "../services/auth.service.js";
import { asyncWrapper } from "../utils/async-wrapper.util.js";

export const register = asyncWrapper(async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json({
    success: true,
    data: result,
  });
});

export const login = asyncWrapper(async (req, res) => {
  const result = await loginUser(req.body);
  res.status(200).json({
    success: true,
    data: result,
  });
});
