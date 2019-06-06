const { Router } = require('express');
const { User } = require('../../models');
const { LogInStruct } = require('../../models');
const { Queue } = require('../../models');

const router = new Router();

router.get('/:id', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.id));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(201).json(user);
    LogInStruct.create({ userId: user.id, emailAddres: user.emailAddress, password: user.password });
    Queue.create({ queue: [], userId: user.id, name: 'none' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});


module.exports = router;
