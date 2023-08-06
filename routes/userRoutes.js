const router = require("express").Router();
const userController = require("../controllers/userController");
const userValidors = require("../validators/userValidators");

router.post("/register", userValidors.register(), userController.register);

router.post("/login", userValidors.login(), userController.login);

module.exports = router;
