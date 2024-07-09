import { asyncWrapper } from "../utils/async-wrapper.util.js";
import * as taskService from "../services/task.service.js";

export const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await taskService.getAllTasks(req.user);
  res.status(200).json({
    success: true,
    data: tasks,
  });
});

export const createTask = asyncWrapper(async (req, res) => {
  const { body: task, user } = req;
  const result = await taskService.createTask(task, user);
  res.status(201).json({
    success: true,
    data: result,
  });
});

export const updateTask = asyncWrapper(async (req, res) => {
  const { body: task, user, emitToUsers } = req;
  const { taskId } = req.params;
  const result = await taskService.updateTask(taskId, task, user, emitToUsers);
  res.status(201).json({
    success: true,
    data: result,
  });
});

export const deleteTask = asyncWrapper(async (req, res) => {
  const { emitToUsers } = req;
  const { taskId } = req.params;
  const result = await taskService.deleteTask(taskId, req.user, emitToUsers);
  res.status(201).json({
    success: true,
    data: result,
  });
});

export const shareTask = asyncWrapper(async (req, res) => {
  const { body: reqObj, user, emitToUsers } = req;
  const { taskId } = req.params;
  const result = await taskService.shareTask(taskId, reqObj, user, emitToUsers);
  res.status(201).json({
    success: true,
    data: result,
  });
});
