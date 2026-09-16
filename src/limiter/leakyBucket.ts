import { redisClient } from "../redis/redis";
import { config } from "../config";

const { capacity, leakRate, ttl } = config.rateLimit;

export async function isAllowed(key: string): Promise<boolean> {
  const now = Date.now();
  const data = await redisClient.hGetAll(key);

  let bucket = Number(data.bucket_level || 0);
  let last = Number(data.last_checked_time || now);

  const elapsed = (now - last) / 1000;
  const leaked = elapsed * leakRate;
  bucket = Math.max(0, bucket - leaked);

  if (bucket + 1 > capacity) {
    return false;
  }
  bucket += 1;

  await redisClient.hSet(key, {
    bucket_level: bucket.toString(),
    last_checked_time: now.toString()
  });

  await redisClient.expire(key, ttl);

  return true;
}