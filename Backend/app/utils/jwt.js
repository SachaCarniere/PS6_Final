// found at https://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
// then modify

const expressJwt = require('express-jwt');
const config = require('../config.json');

function jwt() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      // /.*/,
      /^\/api\/users\/login.*/,
    ],
  });
}

module.exports = jwt;
