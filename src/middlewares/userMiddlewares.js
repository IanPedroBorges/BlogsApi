const joiValidateInputs = require('./schems/validateUser');

const validateCreateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = joiValidateInputs.schemaCreateUser.validate({ displayName, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
  
const validateCreateUserImage = (req, res, next) => {
  if (!req.image) {
    req.image = 'imagemDefault';
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateCreateUserImage,
};