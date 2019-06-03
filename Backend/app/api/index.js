const { Router } = require('express');
const QueuesRouter = require('./queues');
const UsersRouter = require('./users');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/users', UsersRouter);
router.use('/queues', QueuesRouter);

module.exports = router;
