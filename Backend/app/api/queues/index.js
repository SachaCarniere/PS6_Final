const { Router } = require('express');
const { User } = require('../../models');
const { Queue } = require('../../models');

const router = new Router();

function getQueuesByUser(userId) {
  const queues = Queue.get();
  const queuesForUser = [];
  for (let i = 0; i < queues.length; i += 1) {
    if (queues[i].userId.toString() === userId.toString()) {
      queuesForUser.push(queues[i]);
    }
  }
  return queuesForUser;
}

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(getQueuesByUser(req.params.userId));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

/* router.post('/', (req, res) => {
  try {
    const item = Object.assign({}, req.body, { queue: [] });
    const queue = Queue.create(item);
    res.status(201).json(queue);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
}); */

router.put('/:id', (req, res) => {
  try {
    Queue.update(req.params.id, req.body);
    res.status(200).json('updated');
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete('/:id', (req, res) => {
  try {
    Queue.delete(req.params.id);
    res.status(200).json('deleted');
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
