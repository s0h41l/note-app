const { body } = require("express-validator");
const validate = require("./validate");

const email = (check) => [
  check("email").isEmail().withMessage("Invalid Email"),
];

const password = (check) => [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
];

const loginPassword = (check) => [
  check("password").not().isEmpty().withMessage("Password required"),
];

const register = () => [...email(body), ...password(body), validate];

const login = () => [...email(body), ...loginPassword(body), validate];

module.exports = {
  login,
  register,
};
