const Joi = require('joi');

const validateBook = async (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().required(),
    status: Joi.string().required().valid('LENT', 'AVAILABLE', 'UNAVAILABLE').insensitive(),
  });
  await schema.validateAsync(data);
};

module.exports = { validateBook };
