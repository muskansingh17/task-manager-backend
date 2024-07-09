import Joi from "joi";

export const createTaskValidation = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "Description should be a type of text",
  }),
  deadline: Joi.date().allow(null).messages({
    "date.base": "Deadline should be a valid date",
  }),
  status: Joi.string()
    .valid("todo", "in_progress", "done")
    .default("todo")
    .messages({
      "any.only": "Status must be one of 'todo', 'in_progress', or 'done'",
    }),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium")
    .messages({
      "any.only": "Priority must be one of 'low', 'medium', or 'high'",
    }),
  tags: Joi.array().items(Joi.string()).allow(null).messages({
    "array.base": "Tags should be an array of strings",
  }),
});
