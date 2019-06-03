const Joi = require('joi');
const minors = require('../enums/minors.enum');
const countries = require('../enums/countries.enum');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Filter', {
  userId: Joi.number().positive().allow(0).required(),
  id: Joi.number().positive().allow(0).required(),
  name: Joi.string().required(),
  startDate: Joi.any(),
  endDate: Joi.any(),
  year3: Joi.bool().required(),
  year4: Joi.bool().required(),
  year5: Joi.bool().required(),
  minors: Joi.array().items(Joi.string().valid(minors)),
  statusClass: Joi.bool().required(),
  statusIntern: Joi.bool().required(),
  statusGapYear: Joi.bool().required(),
  location: Joi.string().valid(countries),
  moreThan: Joi.bool().required(),
  daysAbroad: Joi.number().positive().allow(0),
  favorite: Joi.bool(),
});
