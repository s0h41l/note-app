const httpErrors = require("http-errors");
const jwt = require("jsonwebtoken");
const models = require("../models");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isExist = await models.User.findOne({
      where: {
        email,
      },
    });

    if (isExist) {
      throw new httpErrors.Conflict({
        message: `User already exists with email: ${email}`,
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
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const options = {
      where: {
        email,
      },
    };

    const user = await models.User.findOne(options);

    if (!user) {
      throw new httpErrors.NotFound({
        message: `No user exists against email: ${email}`,
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
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "60d",
        algorithm: "HS384",
      }
    );

    res.json({
      authToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
