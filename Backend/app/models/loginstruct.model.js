const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('LogInStruct', {
  id: Joi.number().positive().allow(0).required(),
  userId: Joi.number().positive().allow(0),
  studentId: Joi.number().positive().allow(0),
  emailAddress: Joi.string().required(),
  password: Joi.string().required(),
});
