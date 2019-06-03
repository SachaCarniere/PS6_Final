const { Router } = require('express');
const { User } = require('../../models');
const { Queue } = require('../../models');

const router = new Router();

router.get('/:userId', (req, res) => {
  try {
    const user = User.getById(req.params.userId);
    res.status(200).json(Queue.getById(user.queueId));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/:userId', (req, res) => {
  try {
    const user = User.getById(req.params.userId);
    user.queueId = Queue.create(req.body);
    res.status(201).json(Queue.getById(user.queueId));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('./:id', (req, res) => {
  const queue = Queue.getById(req.params.id);
  res.status(200).json(queue.queue.pop());
});


module.exports = router;
