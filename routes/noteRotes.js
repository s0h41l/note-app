const router = require("express").Router();
const noteController = require("../controllers/noteController");
const { auth } = require("../middlewares/auth");
const { cacheGetNote } = require("../middlewares/cache");
const noteValidators = require("../validators/noteValidators");

router.post(
  "/",
  [auth],
  noteValidators.createNote(),
  noteController.createNote
);

router.put(
  "/:id",
  [auth],
  noteValidators.updateNote(),
  noteController.updateNote
);

router.get(
  "/:id",
  [auth, cacheGetNote],
  noteValidators.getNote(),
  noteController.getNote
);

router.get("/", [auth], noteValidators.getNotes(), noteController.getNotes);

router.delete(
  "/:id",
  [auth],
  noteValidators.deleteNote(),
  noteController.deleteNote
);

module.exports = router;
