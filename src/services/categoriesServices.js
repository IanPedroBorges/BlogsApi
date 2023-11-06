const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', date: category.dataValues };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'OK', date: categories };
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: { id } });
  console.log('category', category);
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};