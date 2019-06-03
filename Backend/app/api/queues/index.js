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

router.get('/next/:userId', (req, res) => {
  try {
    const queue = Queue.getById(User.getById(req.params.userId).queueId);
    res.status(200).json(User.getById(queue.queue.shift()));
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
    const item = Object.assign({}, req.body, { queue: [] });
    const queue = Queue.create(item);
    User.update(req.params.userId, { queueId: queue.id });
    res.status(201).json(queue);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:userId', (req, res) => {
  try {
    const queue = Queue.getById(User.getById(req.params.userId).queueId);
    queue.queue.push(req.body.userId);
    res.status(200).json('ok');
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
