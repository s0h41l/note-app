module.exports = (err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message;

  let error = typeof message === "string" ? { message } : message;

  res.status(code).json(error);
};
