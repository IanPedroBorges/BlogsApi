const { schemaCreateCategories } = require('./schems/validateUser');

const validateCategoryName = (req, res, next) => {
  const { name } = req.body;
  const { error } = schemaCreateCategories.validate({ name });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCategoryName,
};