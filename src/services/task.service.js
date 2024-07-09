import UnauthorizedError from "../errors/unauthorized.js";
import * as taskRepository from "../repositories/task.repository.js";
import { emitToUsers } from "../services/socket.service.js"; // Assuming you have a socket service for handling emissions

const getTaskPermissionsByUserId = async (userId, permissions) => {
  const taskPermissions = await taskRepository.getAllTaskIds(
    { userId },
    permissions
  );
  return taskPermissions.map((taskPermission) => String(taskPermission.taskId));
};

const getTaskPermissionsByTaskId = async (taskId) => {
  const taskPermissions = await taskRepository.getAllTaskIds({ taskId }, [
    "owner",
    "collaborator",
    "viewer",
  ]);
  return taskPermissions.map((taskPermission) => String(taskPermission.userId));
};

const mapTasksWithPermissions = (tasks, taskPermissions) => {
  return tasks.map((_task) => {
    const task = JSON.parse(JSON.stringify(_task));
    const { _id: taskId } = task;

    const permission =
      taskPermissions.find(
        (taskPermission) => String(taskPermission.taskId) === String(taskId)
      )?.permission || "viewer";

    task.permission = permission;
    return task;
  });
};

export const getAllTasks = async (user) => {
  const taskPermissions = await taskRepository.getAllTaskIds(
    { userId: user._id },
    ["owner", "collaborator", "viewer"]
  );
  const taskIds = taskPermissions.map((taskPermission) =>
    String(taskPermission.taskId)
  );
  const tasks = await taskRepository.getTasks(taskIds);
  return mapTasksWithPermissions(tasks, taskPermissions);
};

export const createTask = async (task, user) => {
  const result = await taskRepository.createTask(task, user);
  emitToUsers([String(user._id)], "task", "task created", result);
  return result;
};

export const updateTask = async (taskId, task, user) => {
  const taskIds = await getTaskPermissionsByUserId(user._id, [
    "owner",
    "collaborator",
  ]);
  if (!taskIds.includes(taskId)) {
    throw new UnauthorizedError("Not authorized to update this task");
  }
  const result = await taskRepository.updateTask(taskId, task);
  const userIds = await getTaskPermissionsByTaskId(taskId);
  emitToUsers(userIds, "task", "task updated", result);
  return result;
};

export const deleteTask = async (taskId, user) => {
  const taskIds = await getTaskPermissionsByUserId(user._id, ["owner"]);
  if (!taskIds.includes(taskId)) {
    throw new UnauthorizedError("Not authorized to delete this task");
  }
  const userIds = await getTaskPermissionsByTaskId(taskId);
  const result = await taskRepository.deleteTask(taskId);
  emitToUsers(userIds, "task", "task deleted", taskId);
  return result;
};

export const shareTask = async (taskId, reqObj, user) => {
  const taskIds = await getTaskPermissionsByUserId(user._id, ["owner"]);
  if (!taskIds.includes(taskId)) {
    throw new UnauthorizedError("Not authorized to share this task");
  }
  const result = await taskRepository.shareTask({ ...reqObj, taskId });
  const userIds = await getTaskPermissionsByTaskId(taskId);
  emitToUsers(userIds, "task", "task shared", result);
  return result;
};
