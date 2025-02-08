import Joi from "joi"

const userSchema = Joi.object({
    username: Joi.string()
        .required()
        .min(3)
        .max(50)
        .trim()
        .messages({
            'string.base': 'User Name must be a string',
            'string.empty': 'User Name is required',
            'string.min': 'User Name must be at least 3 characters long',
            'string.max': 'User Name cannot be more than 50 characters long',
            'any.required': 'User Name is required',
        }),
    email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .lowercase()
        .messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
        }),
    password: Joi.string()
        .required()
        .min(6)
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required',
        }),
    role: Joi.string().required()
        .valid('user', 'admin')
        .default('user')
        .messages({
            'string.base': 'Role must be a string',
            'string.valid': 'Invalid role value',
        }),
    profileImg: Joi.string(),
    refreshToken: Joi.string(),
});

export default userSchema;