const { schemaCreateBlogPosts } = require('./schems/validateUser');

const { categoriesServices, blogsPostServices } = require('../services');

const validateCategoryInputs = (req, res, next) => {
  const { title, content } = req.body;
  const { error } = schemaCreateBlogPosts.validate({ title, content });
  if (error) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds.length === 0) {
    return res.status(400).json({
      message: 'one or more "categoryIds" not found',
    });
  }
  const promissesCategory = categoryIds
    .map((categoryid) => categoriesServices.getCategoryById(categoryid));
  const result = (await Promise.all(promissesCategory)).some((e) => e === null);
  if (result) {
    return res.status(400).json({
      message: 'one or more "categoryIds" not found',
    });
  }

  next();
};

const verificationUserId = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const post = await blogsPostServices.getPostById(id);
  if (post.status === 'NOT_FOUND') {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (post.date.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = {
  validateCategoryInputs,
  validateCategoryIds,
  verificationUserId,
};
