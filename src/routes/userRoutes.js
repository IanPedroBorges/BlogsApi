const router = require('express').Router();
const { userMiddlewares, authorizationToken } = require('../middlewares');
const { userControl } = require('../controller');

router.get('/', authorizationToken, userControl.getAllUsers);

router.get('/:id', authorizationToken, userControl.getUserById);

router.post(
  '/',
  userMiddlewares.validateCreateUser,
  userMiddlewares.validateCreateUserImage,
  userControl.createUser,
);

router.delete('/me', authorizationToken, userControl.deleteUser);

module.exports = router;