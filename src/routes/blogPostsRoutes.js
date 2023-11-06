const router = require('express').Router();

const { authorizationToken, blogsPostsMiddlewares } = require('../middlewares');
const { blogPostsControl } = require('../controller');

router.get('/search', authorizationToken, blogPostsControl.getAllPostByQuery);

router.get('/', authorizationToken, blogPostsControl.getAllPosts);

router.get('/:id', authorizationToken, blogPostsControl.getPostByid);

router.put(
  '/:id',
  authorizationToken,
  blogsPostsMiddlewares.validateCategoryInputs,
  blogsPostsMiddlewares.verificationUserId,
  blogPostsControl.updatePost,
);

router.post(
  '/',
  authorizationToken,
  blogsPostsMiddlewares.validateCategoryInputs,
  blogsPostsMiddlewares.validateCategoryIds,
  blogPostsControl.createBlogPosts,
);

router.delete(
  '/:id',
  authorizationToken,
  blogsPostsMiddlewares.verificationUserId,
  blogPostsControl.deletePost,
);

module.exports = router;
