const Joi = require('joi');

const schemaCreateUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': '{#label} is required',
  'string.min': '{#label} length must be at least {#limit} characters long',
  'string.email': '{#label} must be a valid email',
});

const schemaCreateCategories = Joi.object({
  name: Joi.string().min(1).required(),
}).messages({
  'any.required': '{#label} is required',
  'string.min': '{#label} length must be at least {#limit} characters long',
});

const schemaCreateBlogPosts = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

module.exports = {
  schemaCreateUser,
  schemaCreateCategories,
  schemaCreateBlogPosts,
};

// .not.empty()