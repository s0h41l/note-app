const { validationResult } = require("express-validator");
const httpErrors = require("http-errors");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new httpErrors.UnprocessableEntity({ errors: errors.array() });
  }
  next();
};
