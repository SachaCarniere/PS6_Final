const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Queue', {
  name: Joi.string().required(),
  queue: Joi.array().items(Joi.number()).required(),
  userId: Joi.number().positive().allow(0).required(),
});
