const redis = require("redis");

REDIS_HOST = process.env.REDIS_HOST || "localhost";
REDIS_PORT = process.env.REDIS_PORT || "6379";

// Create a Redis client
const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

client.connect(() => console.log("Redis Connected"));

// Error handling for the Redis connection
client.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = client;
