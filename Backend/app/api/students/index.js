const { Router } = require('express');
const { Student } = require('../../models');
const { User } = require('../../models');

const router = new Router();

function getStudentsByMajor(major) {
  const students = Student.get();
  const studentsInMajor = [];
  for (let i = 0; i < students.length; i += 1) {
    if (students[i].major === major) {
      studentsInMajor.push(students[i]);
    }
  }
  return studentsInMajor;
}

router.get('/:userId', (req, res) => {
  try {
    if (req.params.userId < 0) {
      res.status(401).json('Please log in');
    } else {
      const user = User.getById(req.params.userId);
      res.status(200).json(getStudentsByMajor(user.major));
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:studentId', (req, res) => {
  try {
    Student.update(req.params.studentId, req.body);
    res.status(200).json(Student.getById(req.params.studentId));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
