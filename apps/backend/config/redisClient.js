const Redis = require("ioredis");

const redis = new Redis({
  host: "localhost",
  port: process.env.REDIS_PORT,
  //   password, db
});

redis.on("connect", () => {
  console.log("connected to redis");
});

redis.on("error", (err) => {
  console.log("failed to connect", err);
});

module.exports = redis;
