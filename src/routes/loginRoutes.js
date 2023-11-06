const router = require('express').Router();
const { loginMiddlewares } = require('../middlewares');
const { loginControl } = require('../controller');

router.post('/', loginMiddlewares.validatesInputs, loginControl.loginPost);

module.exports = router;