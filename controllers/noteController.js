const httpErrors = require("http-errors");
const models = require("../models");

const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id: userId } = req.user;

    const createdNote = await models.Note.create({
      title,
      content,
      userId,
    });

    res.status(201).json(createdNote);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;

    const note = await models.Note.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      throw new httpErrors.NotFound(`No note found against Id '${id}'`);
    }

    note.title = title;
    note.content = content;

    const updatedNote = await note.save();

    res.status(201).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const { id: userId } = req.user;

    const notes = await models.Note.findAndCountAll({
      where: {
        userId,
      },
      limit: +limit,
      offset: +offset,
    });

    const response = {
      count: notes.count,
      notes: notes.rows,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    const note = await models.Note.findOne({
      where: {
        userId,
        id,
      },
    });

    if (!note) {
      throw new httpErrors.NotFound(`No note found against Id '${id}'`);
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    const note = await models.Note.findOne({
      where: {
        userId,
        id,
      },
    });

    if (!note) {
      throw new httpErrors.NotFound(`No note found against Id '${id}'`);
    }

    await note.destroy();

    res.json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  updateNote,
  getNotes,
  getNote,
  deleteNote,
};
