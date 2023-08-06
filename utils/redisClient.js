const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  username: process.env.REDIS_USER || "",
  password: process.env.REDIS_PASSWORD || "",
});

client.connect(() => console.log("Redis Connected"));

// Error handling for the Redis connection
client.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = client;
