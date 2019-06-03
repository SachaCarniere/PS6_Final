const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Mail', {
  id: Joi.number().positive().allow(0).required(),
  userId: Joi.number().positive().allow(0).required(),
  title: Joi.string().required(),
  message: Joi.string().required(),
});
