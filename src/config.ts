import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3008,
  redisUrl: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  rateLimit: {
    capacity: Number(process.env.RATE_LIMIT_CAPACITY) || 10,
    leakRate: Number(process.env.RATE_LIMIT_LEAK_RATE) || 1,
    ttl: Number(process.env.RATE_LIMIT_TTL) || 60
  }
};