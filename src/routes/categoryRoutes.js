const router = require('express').Router();

const { authorizationToken, categoriesMiddlewares } = require('../middlewares');
const { categoryControl } = require('../controller');

router.get('/', authorizationToken, categoryControl.getAllCategories);

router.post(
  '/',
  authorizationToken,
  categoriesMiddlewares.validateCategoryName,
  categoryControl.createCategory,
);

module.exports = router;