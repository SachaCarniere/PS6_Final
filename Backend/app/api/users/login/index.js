const { Router } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../../config.json');
const { User } = require('../../../models');
const { LogInStruct } = require('../../../models');
const { Student } = require('../../../models');

const router = new Router();

async function authenticate({ emailAddress, password }) {
  const logins = LogInStruct.get();
  let user;
  for (const i in logins) {
    if (emailAddress === logins[i].emailAddress) {
      if (password === logins[i].password) {
        try {
          user = User.getById(logins[i].userId);
        } catch (e) {
          user = Student.getById(logins[i].userId);
        }
      }
    }
  }
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    console.log(user);
    return {
      user,
      token,
    };
  }
}

router.post('/', (req, res, next) => {
  authenticate(req.body)
    .then(user => (user ? res.status(200).json(user) : res.status(400).json({ message: 'Username or password is incorrect' })))
    .catch(err => next(err));
});

module.exports = router;

/* function login(email, password) {
  const logins = LogInStruct.get();
  for (let i in logins) {
    if (email === logins[i].emailAddress) {
      if (password === logins[i].password){
        return User.getById(logins[i].userId);
      }
      else
        return -1;
    }
  }
  return -2;
} */
