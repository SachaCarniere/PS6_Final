const { Router } = require('express');
const { Columns } = require('../../models');

const router = new Router();

function getColumnsByUserId(userId) {
  const columns = Columns.get();
  const columnsWithUserId = [];

  columns.forEach((column) => {
    if (column.userId.toString() === userId) columnsWithUserId.push(column);
  });

  return columnsWithUserId;
}

router.get('/:userId', (req, res) => {
  try {
    if (req.params.userId < 0) {
      res.status(401).json('Please log in');
    } else {
      res.status(200).json(getColumnsByUserId(req.params.userId));
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
    const column = Columns.create(req.body);
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
    Columns.delete(req.params.id);
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
    Columns.update(req.params.id, req.body);
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
