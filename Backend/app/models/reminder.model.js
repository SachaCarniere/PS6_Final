const Joi = require('joi');
const BaseModel = require('../utils/base-model');

module.exports = new BaseModel('Reminder', {
  id: Joi.number().positive().allow(0).required(),
  userId: Joi.number().positive().allow(0).required(),
  name: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  message: Joi.string().required(),
  dismissed: Joi.boolean().required(),
});
