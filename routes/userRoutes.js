const router = require("express").Router();
const userController = require("../controllers/userController");
const userValidators = require("../validators/userValidators");

router.post("/register", userValidators.register(), userController.register);

router.post("/login", userValidators.login(), userController.login);

module.exports = router;
