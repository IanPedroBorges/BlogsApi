const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (payload) => jwt.sign(payload, SECRET_KEY);

const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  generateToken,
  verifyToken,
};
