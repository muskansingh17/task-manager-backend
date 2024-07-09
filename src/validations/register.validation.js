import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(1).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password is required",
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is required",
  }),
});
