const Joi = require('joi');
const majors = require('../enums/majors.enum');
const minors = require('../enums/minors.enum');
const status = require('../enums/status.enum');
const countries = require('../enums/countries.enum');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Student', {
  id: Joi.number().positive().allow(0).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  major: Joi.string().valid(majors).required(),
  minor: Joi.string().valid(minors).required(),
  year: Joi.number().integer().min(3).max(5)
    .required(),
  status: Joi.string().valid(status).required(),
  location: Joi.string().valid(countries).required(),
  daysAbroad: Joi.number().min(0).required(),
});
