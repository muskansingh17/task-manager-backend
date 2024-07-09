import Joi from "joi";

export const shareTaskValidation = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "User ID should be a type of text",
    "string.empty": "User ID is required",
    "any.required": "User ID is required",
  }),
  permission: Joi.string()
    .valid("owner", "collaborator", "viewer")
    .required()
    .messages({
      "any.only":
        "Permission must be one of 'owner', 'collaborator', or 'viewer'",
      "any.required": "Permission is required",
    }),
});
