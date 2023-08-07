const router = require("express").Router();
const userController = require("../controllers/userController");
const userValidators = require("../validators/userValidators");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing user
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Mypassword123!
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */

router.post("/register", userValidators.register(), userController.register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Mypassword123!
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", userValidators.login(), userController.login);

module.exports = router;
