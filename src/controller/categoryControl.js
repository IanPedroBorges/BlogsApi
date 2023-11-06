const { categoriesServices } = require('../services');
const { httpResStatus } = require('../utils');

const getAllCategories = async (req, res) => {
  const { status, date } = await categoriesServices.getAllCategories();
  return res.status(httpResStatus(status)).json(date);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, date } = await categoriesServices.createCategory(name);
  return res.status(httpResStatus(status)).json(date);
};

module.exports = {
  createCategory,
  getAllCategories,
};