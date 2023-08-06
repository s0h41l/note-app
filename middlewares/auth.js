const httpErrors = require("http-errors");
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization || "";
    const decodedToken = jwt.verify(
      token.trim().replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    req.user = {
      id: decodedToken.id,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    next(
      new httpErrors.Unauthorized({
        error: "Invalid/Expired token.",
      })
    );
  }
};
