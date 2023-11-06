const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const db = require('../models');

const createNewPost = async (title, content, categoryIds, userId) => {
  const t = await db.sequelize.transaction();
  try {
    const newPost = await BlogPost.create(
      { title, content, userId, published: new Date(), updated: new Date() },
      { transaction: t },
    );
    const promissesCategoryPost = categoryIds.map((categoryId) =>
      PostCategory.create({ postId: newPost.id, categoryId }, { transaction: t }));
    await Promise.all(promissesCategoryPost);
    await t.commit();
    return { status: 'CREATED', date: newPost };
  } catch (error) {
    await t.rollback();
    return { status: 'INTERNAL_SERVER_ERROR', date: { message: error.message } };
  }
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories' },
    ],
  });
  return { status: 'OK', date: allPosts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (!post) return { status: 'NOT_FOUND', date: { message: 'Post does not exist' } };
  return { status: 'OK', date: post };
};

const getPostByTitleOrContent = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return { status: 'OK', date: posts };
};

const updatePost = async (id, title, content) => {
  const post = await BlogPost.update({ title, content }, { where: { id } });
  if (!post) return { status: 'NOT_FOUND', date: { message: 'Post does not exist' } };
  const postUpdated = await getPostById(id);
  return { status: 'OK', date: postUpdated.date };
};

const deletePost = async (id) => {
  const t = await db.sequelize.transaction();
  try {
    await PostCategory.findAll({ where: { postId: id } }, { transaction: t });
    await BlogPost.destroy({ where: { id } }, { transaction: t });
    await t.commit();
    return { status: 'NO_CONTENT', date: '' };
  } catch (error) {
    await t.rollback();
    return { status: 'INTERNAL_SERVER_ERROR', date: { message: error.message } };
  }
};

module.exports = {
  getAllPosts,
  createNewPost,
  getPostById,
  updatePost,
  deletePost,
  getPostByTitleOrContent,
};
