const Redis = require("ioredis");
//redis client library for node js

const redis = new Redis({
  // host: '127.0.0.1',
  // port: 6379,
});

async function ioRedisDemo() {
  try {
    await redis.set("key", "value");
    const val = await redis.get("key");
    console.log(val);
  } catch (e) {
    console.error(e);
  } finally {
    redis.quit();
  }
}

ioRedisDemo();
