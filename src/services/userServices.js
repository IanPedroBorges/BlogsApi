const { User } = require('../models');
const { functionsToken } = require('../utils');

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  console.log(users);
  return { status: 'OK', data: users };
};

const getUserById = async (id) => {
  const user = await User
    .findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }
  return { status: 'OK', data: user.dataValues };
};

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });
  if (user !== null) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
  
  const { dataValues } = await User.create({ displayName, email, password, image });
  if (!dataValues) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'System Error' } };
  }
  const token = functionsToken.generateToken({ id: dataValues.id, email, displayName, image });
  return { status: 'CREATED', data: { token } };
};

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });
  if (!user) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  return { status: 'NO_CONTENT', data: { message: 'User deleted successfully' } };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};