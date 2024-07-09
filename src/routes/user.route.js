import express from "express";
import {
  getUserProfile,
  getAllUserEmails,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);
router.get("/me", getUserProfile);
router.get("/emails", getAllUserEmails);

export default router;
