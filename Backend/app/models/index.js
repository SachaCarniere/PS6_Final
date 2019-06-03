const Queue = require('./queue.model.js');
const User = require('./user.model.js');
const LogInStruct = require('./loginstruct.model.js');
const Student = require('./student.model');
const Filter = require('./filter.model');
const Mail = require('./mail.model');
const Columns = require('./column.model');
const Reminder = require('./reminder.model');

module.exports = {
  Queue,
  User,
  LogInStruct,
  Student,
  Filter,
  Mail,
  Columns,
  Reminder,
};
