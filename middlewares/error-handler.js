module.exports = (err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message;
  res.status(code).json(message);
};
