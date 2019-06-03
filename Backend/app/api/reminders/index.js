const { Router } = require('express');
const { Reminder } = require('../../models');

const router = new Router();

function getReminderByUserId(userId) {
  const reminder = Reminder.get();
  const reminderWithUserId = [];

  reminder.forEach((column) => {
    if (column.userId.toString() === userId) reminderWithUserId.push(column);
  });

  return reminderWithUserId;
}

router.get('/:userId', (req, res) => {
  try {
    if (req.params.userId < 0) {
      res.status(401).json('Please log in');
    } else {
      res.status(200).json(getReminderByUserId(req.params.userId));
    }
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
    const column = Reminder.create(req.body);
    res.status(201).json(column);
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
    Reminder.delete(req.params.id);
    res.status(200).json('updated');
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:id', (req, res) => {
  try {
    Reminder.update(req.params.id, req.body);
    res.status(200).json('updated');
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
