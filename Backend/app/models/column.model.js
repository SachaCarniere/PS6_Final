const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Column', {
  userId: Joi.number().positive().allow(0).required(),
  id: Joi.number().positive().allow(0).required(),
  name: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  checkId: Joi.boolean().required(),
  firstName: Joi.boolean().required(),
  lastName: Joi.boolean().required(),
  email: Joi.boolean().required(),
  year: Joi.boolean().required(),
  daysAbroad: Joi.boolean().required(),
  minor: Joi.boolean().required(),
  status: Joi.boolean().required(),
  location: Joi.boolean().required(),
  columnsToShow: Joi.any().required(),
  favorite: Joi.boolean().required(),
});
