const { Router } = require('express');
const QueuesRouter = require('./queues');
const UsersRouter = require('./users');
const LoginRouter = require('./users/login');
const StudentRouter = require('./students');
const FilterRouter = require('./filters');
const MailRouter = require('./mails');
const ColumnRouter = require('./columns');
const ReminderRouter = require('./reminders');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/users', UsersRouter);
router.use('/queues', QueuesRouter);
router.use('/users/login', LoginRouter);
router.use('/students', StudentRouter);
router.use('/filters', FilterRouter);
router.use('/mails', MailRouter);
router.use('/columns', ColumnRouter);
router.use('/reminders', ReminderRouter);

module.exports = router;
