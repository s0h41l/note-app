const redisClient = require("../utils/redisClient");

const cacheGetNote = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const cachedNode = await redisClient.get(`note-${userId}-${id}`);

    if (cachedNode) {
      return res.json(JSON.parse(cachedNode));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  cacheGetNote,
};
