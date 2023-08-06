const httpErrors = require("http-errors");
const redisClient = require("../utils/redisClient");
const models = require("../models");
const Logger = require("../utils/logger");

const logger = new Logger();
const context = "noteController";

const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id: userId } = req.user;

    logger.log(
      "info",
      `${context}@createNote`,
      JSON.stringify({ userId, title, content })
    );

    const createdNote = await models.Note.create({
      title,
      content,
      userId,
    });

    res.status(201).json(createdNote);
  } catch (error) {
    logger.log("error", `${context}@createNote`, JSON.stringify(error));
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;

    logger.log(
      "info",
      `${context}@updateNote`,
      JSON.stringify({ id, userId, title, content })
    );

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

    await redisClient.set(`note-${userId}-${id}`, JSON.stringify(updatedNote)); // caching the note

    res.status(201).json(updatedNote);
  } catch (error) {
    logger.log("error", `${context}@updateNote`, JSON.stringify(error));
    next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const { id: userId } = req.user;

    logger.log(
      "info",
      `${context}@getNotes`,
      JSON.stringify({ limit, offset, userId })
    );

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
    logger.log("error", `${context}@getNotes`, JSON.stringify(error));
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    logger.log("info", `${context}@getNote`, JSON.stringify({ id, userId }));

    const note = await models.Note.findOne({
      where: {
        userId,
        id,
      },
    });

    if (!note) {
      throw new httpErrors.NotFound(`No note found against Id '${id}'`);
    }

    await redisClient.set(`note-${userId}-${id}`, JSON.stringify(note)); // caching the note

    res.json(note);
  } catch (error) {
    logger.log("error", `${context}@getNote`, JSON.stringify(error));
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    logger.log("info", `${context}@deleteNote`, JSON.stringify({ id, userId }));

    const note = await models.Note.findOne({
      where: {
        userId,
        id,
      },
    });

    if (!note) {
      throw new httpErrors.NotFound(`No note found against Id '${id}'`);
    }

    await Promise.all([
      note.destroy(),
      redisClient.del(`note-${userId}-${id}`, JSON.stringify(note)), // deleting from cache
    ]);

    res.json({ message: "Note deleted" });
  } catch (error) {
    logger.log("error", `${context}@deleteNote`, JSON.stringify(error));
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
