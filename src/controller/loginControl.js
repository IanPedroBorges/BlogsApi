const { loginServices } = require('../services');
const { httpResStatus } = require('../utils');

const loginPost = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await loginServices.loginValidate(email, password);
  return res.status(httpResStatus(status)).json(data);
};

module.exports = {
  loginPost,
};