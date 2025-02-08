import Joi from 'joi';

export const userSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Full Name should be a type of text',
            'string.empty': 'Full Name cannot be empty',
            'string.min': 'Full Name should have at least {#limit} characters',
            'string.max': 'Full Name should have at most {#limit} characters',
            'any.required': 'Full Name is required',
        }),

    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Username should be a type of text',
            'string.empty': 'Username cannot be empty',
            'string.min': 'Username should have at least {#limit} characters',
            'string.max': 'Username should have at most {#limit} characters',
            'any.required': 'Username is required',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should have at least {#limit} characters',
            'any.required': 'Password is required',
        }),
});


/*
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should have at least {#limit} characters',
      'string.max': 'Name should have at most {#limit} characters',
      'string.pattern.base': 'Name can only contain letters and spaces',
      'any.required': 'Name is required',
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email should be a type of text',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
  
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'))
    .required()
    .messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have at least {#limit} characters',
      'string.max': 'Password should have at most {#limit} characters',
      'string.pattern.base': 'Password must include one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),
  
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm password does not match',
      'any.required': 'Confirm password is required',
    }),

  dob: Joi.date()
    .greater('1-1-1900')
    .less('now')
    .required()
    .messages({
      'date.base': 'Date of Birth should be a valid date',
      'date.greater': 'Date of Birth should be after January 1, 1900',
      'date.less': 'Date of Birth should be before today',
      'any.required': 'Date of Birth is required',
    })
});

module.exports = userSchema;
 */