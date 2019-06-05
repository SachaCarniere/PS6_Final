const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('User', {
  id: Joi.number().positive().allow(0).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().required(),
  major: Joi.string().valid(['MAM', 'SI', 'ELEC', 'GE', 'GB', 'BAT']),
});
