const { body, param, query } = require("express-validator");
const validate = require("./validate");

const id = (check) => [
  check("id")
    .notEmpty()
    .withMessage("Id is required")
    .isNumeric()
    .withMessage("Invalid Id"),
];

const title = (check) => [
  check("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Title cannot exceed 255 characters"),
];

const content = (check) => [
  check("content")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Title cannot exceed 255 characters"),
];

const limit = (check) => [
  check("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

const offset = (check) => [
  check("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive integer"),
];

const createNote = () => [...title(body), ...content(body), validate];

const updateNote = () => [
  ...id(param),
  ...title(body),
  ...content(body),
  validate,
];

const getNotes = () => [...limit(query), ...offset(query), validate];

const getNote = () => [...id(param), validate];

const deleteNote = () => [...id(param), validate];

module.exports = {
  createNote,
  updateNote,
  getNote,
  deleteNote,
  getNotes,
};
