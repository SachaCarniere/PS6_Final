const { Router } = require('express');
const { User } = require('../../models');

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
    res.status(201).json(User.create(req.body));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});


module.exports = router;