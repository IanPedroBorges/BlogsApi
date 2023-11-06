const loginMiddlewares = require('./loginMiddlewares');
const userMiddlewares = require('./userMiddlewares');
const categoriesMiddlewares = require('./categoriesMiddlewares');
const blogsPostsMiddlewares = require('./blogPostsMiddlewares');
const authorizationToken = require('./authorizationToken');

module.exports = {
  loginMiddlewares,
  userMiddlewares,
  categoriesMiddlewares,
  blogsPostsMiddlewares,
  authorizationToken,
};