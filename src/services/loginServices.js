const { User } = require('../models');
const { functionsToken } = require('../utils');

const loginValidate = async (email, password) => {
  const user = await User
    .findOne({ where: { email, password }, attributes: { exclude: ['password'] } });
  if (!user) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const token = functionsToken.generateToken({ email, id: user.dataValues.id });

  return { status: 'OK', data: { token } };
};

module.exports = {
  loginValidate,
};