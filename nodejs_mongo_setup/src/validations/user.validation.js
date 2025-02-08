import Joi from "joi";

export const validateCreateUser = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateUpdateUser = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  fullName: Joi.string(),
});
