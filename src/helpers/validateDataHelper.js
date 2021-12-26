const Joi = require('joi');

const validateSaveBook = async (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().required(),
    status: Joi.string().required().valid('LENT', 'AVAILABLE', 'UNAVAILABLE').insensitive(),
  });
  await schema.validateAsync(data);
};

const validateUpdateBook = async (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    pages: Joi.number(),
    status: Joi.string().valid('LENT', 'AVAILABLE', 'UNAVAILABLE').insensitive(),
  });
  await schema.validateAsync(data);
};

module.exports = { validateSaveBook, validateUpdateBook };
