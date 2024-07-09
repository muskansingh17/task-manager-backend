import express from "express";
import * as taskController from "../controllers/task.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../utils/validate.util.js";
import { createTaskValidation } from "../validations/create-task.validation.js";
import { shareTaskValidation } from "../validations/share-task.validation.js";
import { updateTaskValidation } from "../validations/update-task.validation.js";

const router = express.Router();

router.use(authenticate);
router.get("/", taskController.getTasks);
router.post("/", validate(createTaskValidation), taskController.createTask);
router.patch(
  "/:taskId/share",
  validate(shareTaskValidation),
  taskController.shareTask
);
router.patch(
  "/:taskId",
  validate(updateTaskValidation),
  taskController.updateTask
);
router.delete("/:taskId", taskController.deleteTask);

export default router;
