import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../utils/validate.util.js";
import { registerValidation } from "../validations/register.validation.js";
import { loginValidation } from "../validations/login.validation.js";

const router = express.Router();

router.post("/register", validate(registerValidation), authController.register);
router.post("/login", validate(loginValidation), authController.login);

export default router;
