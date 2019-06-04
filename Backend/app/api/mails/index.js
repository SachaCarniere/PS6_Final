const { Router } = require('express');
const { Mail } = require('../../models');
const { User } = require('../../models');

const router = new Router();

function getMailsByUser(userId) {
  const mails = Mail.get();
  const mailForUser = [];
  for (let i = 0; i < mails.length; i++) {
    if (mails[i].userId === userId) {
      mailForUser.push(mails[i]);
    }
  }
  return mailForUser;
}

router.get('/:userId', (req, res) => {
  try {
    if (req.params.userId < 0) {
      res.status(401).json('Please log in');
    } else {
      const user = User.getById(req.params.userId);
      res.status(200).json(getMailsByUser(user.id));
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
    const mail = Mail.create(req.body);
    res.status(201).json(mail);
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
    Mail.update(req.params.id, req.body);
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
    Mail.delete(req.params.id);
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
