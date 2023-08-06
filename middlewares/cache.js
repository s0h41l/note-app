const redisClient = require("../utils/redisClient");
const Logger = require("../utils/logger");

const logger = new Logger();

const cacheGetNote = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const cachedNode = await redisClient.get(`note-${userId}-${id}`);

    if (cachedNode) {
      logger.log(
        "info",
        `cacheMiddleware@cacheGetNote`,
        JSON.stringify({ id, userId })
      );
      return res.json(JSON.parse(cachedNode));
    }

    next();
  } catch (error) {
    logger.log("error", `cacheMiddleware@cacheGetNote`, JSON.stringify(error));
    next(error);
  }
};

module.exports = {
  cacheGetNote,
};
