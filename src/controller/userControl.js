const { userServices } = require('../services');
const { httpResStatus } = require('../utils');

const getAllUsers = async (req, res) => {
  const { data, status } = await userServices.getAllUsers();
  return res.status(httpResStatus(status)).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await userServices.getUserById(id);
  return res.status(httpResStatus(status)).json(data);
};

const createUser = async (req, res) => {
  const { body } = req;
  const { data, status } = await userServices.createUser(body);
  return res.status(httpResStatus(status)).json(data);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const { data, status } = await userServices.deleteUser(id);
  return res.status(httpResStatus(status)).json(data);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};