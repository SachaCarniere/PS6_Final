const { Router } = require('express');
const { Filter } = require('../../models');

const router = new Router();

function getFilterByUserId(userId) {
  const filters = Filter.get();
  const filtersWithUserId = [];

  filters.forEach((filter) => {
    if (filter.userId.toString() === userId) filtersWithUserId.push(filter);
  });

  return filtersWithUserId;
}

router.get('/:userId', (req, res) => {
  try {
    if (req.params.userId < 0) {
      res.status(401).json('Please log in');
    } else {
      res.status(200).json(getFilterByUserId(req.params.userId));
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
    const filter = Filter.create(req.body);
    res.status(201).json(filter);
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
    Filter.delete(req.params.id);
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
    Filter.update(req.params.id, req.body);
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
