const httpErrors = require("http-errors");
const jwt = require("jsonwebtoken");
const models = require("../models");
const Logger = require("../utils/logger");

const logger = new Logger();
const context = "userController";

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    logger.log("info", `${context}@register`, JSON.stringify({ email }));

    const isExist = await models.User.findOne({
      where: {
        email,
      },
    });

    if (isExist) {
      throw new httpErrors.Conflict({
        message: `User already exists with email ${email}`,
      });
    }

    const user = await models.User.create({
      email,
      password,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    logger.log("error", `${context}@register`, JSON.stringify(error));
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    logger.log("info", `${context}@login`, JSON.stringify({ email }));

    const options = {
      where: {
        email,
      },
    };

    const user = await models.User.findOne(options);

    if (!user) {
      throw new httpErrors.NotFound({
        message: `No user exists against email ${email}`,
      });
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      throw new httpErrors.Unauthorized({ message: "Invalid password" });
    }

    const authToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60d",
        algorithm: "HS384",
      }
    );

    res.json({
      authToken,
    });
  } catch (error) {
    logger.log("error", `${context}@login`, JSON.stringify(error));
    next(error);
  }
};

module.exports = {
  register,
  login,
};
