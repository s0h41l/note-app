const router = require("express").Router();
const noteController = require("../controllers/noteController");
const { auth } = require("../middlewares/auth");
const { cacheGetNote } = require("../middlewares/cache");
const noteValidators = require("../validators/noteValidators");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing user
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /note:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Note title
 *                 example: My Note Title
 *               content:
 *                 type: string
 *                 description: Note content
 *                 example: This is the content of my note.
 *     responses:
 *       200:
 *         description: Note created successfully
 *       400:
 *         description: Invalid input or error creating note
 */
router.post(
  "/",
  [auth],
  noteValidators.createNote(),
  noteController.createNote
);

/**
 * @swagger
 * /note/{id}:
 *   put:
 *     summary: Update a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated note title
 *                 example: Updated Note Title
 *               content:
 *                 type: string
 *                 description: Updated note content
 *                 example: This is the updated content of my note.
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Invalid input or error updating note
 *       404:
 *         description: Note not found
 */
router.put(
  "/:id",
  [auth],
  noteValidators.updateNote(),
  noteController.updateNote
);

/**
 * @swagger
 * /note/{id}:
 *   get:
 *     summary: Retrieve a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Note details
 *       404:
 *         description: Note not found
 */
router.get(
  "/:id",
  [auth, cacheGetNote],
  noteValidators.getNote(),
  noteController.getNote
);

/**
 * @swagger
 * /note:
 *   get:
 *     summary: Retrieve all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of notes to retrieve
 *         example: 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of notes to skip
 *         example: 0
 *     responses:
 *       200:
 *         description: List of notes
 *       400:
 *         description: Invalid input or error retrieving notes
 */
router.get("/", [auth], noteValidators.getNotes(), noteController.getNotes);

/**
 * @swagger
 * /note/{id}:
 *   delete:
 *     summary: Delete a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 */
router.delete(
  "/:id",
  [auth],
  noteValidators.deleteNote(),
  noteController.deleteNote
);

module.exports = router;
