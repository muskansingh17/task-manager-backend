import TaskPermission from "../models/task-permission.model.js";
import Task from "../models/task.model.js";

export const getAllTaskIds = async (filter, permissions) => {
  return await TaskPermission.find({
    ...filter,
    permission: permissions,
  });
};

export const getTasks = async (taskIds) => {
  return await Task.find({
    _id: taskIds,
  });
};

export const getTask = async (taskId) => {
  return await Task.findOne({ _id: taskId });
};

export const createTask = async (task, user) => {
  const newTask = new Task({
    ...task,
    deadline: new Date(task.deadline),
  });
  const createdTask = await newTask.save();

  const newTaskPermission = new TaskPermission({
    userId: user.id,
    taskId: createdTask.id,
    permission: "owner",
  });
  await newTaskPermission.save();
  return createdTask;
};

export const updateTask = async (taskId, task) => {
  return await Task.updateOne({ _id: taskId }, task);
};

export const deleteTask = async (taskId) => {
  await Task.deleteOne({ _id: taskId });
  await TaskPermission.deleteMany({ taskId });
  return true;
};

export const shareTask = async (taskPermission) => {
  const newTaskPermission = new TaskPermission(taskPermission);
  return await newTaskPermission.save();
};
