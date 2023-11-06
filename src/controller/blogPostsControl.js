const { blogsPostServices } = require('../services');
const { httpResStatus } = require('../utils');

const getAllPostByQuery = async (req, res) => {
  const { q } = req.query;
  const { status, date } = await blogsPostServices.getPostByTitleOrContent(q);
  return res.status(httpResStatus(status)).json(date);
};

const getAllPosts = async (req, res) => {
  const { status, date } = await blogsPostServices.getAllPosts();
  return res.status(httpResStatus(status)).json(date);
};

const getPostByid = async (req, res) => {
  const { id } = req.params;
  const { status, date } = await blogsPostServices.getPostById(id);
  return res.status(httpResStatus(status)).json(date);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { status, date } = await blogsPostServices.updatePost(id, title, content);
  return res.status(httpResStatus(status)).json(date);
};

const createBlogPosts = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const { status, date } = await blogsPostServices.createNewPost(title, content, categoryIds, id);
  return res.status(httpResStatus(status)).json(date);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { status, date } = await blogsPostServices.deletePost(id);
  return res.status(httpResStatus(status)).json(date);
};

module.exports = {
  createBlogPosts,
  getAllPosts,
  getPostByid,
  updatePost,
  deletePost,
  getAllPostByQuery,
};