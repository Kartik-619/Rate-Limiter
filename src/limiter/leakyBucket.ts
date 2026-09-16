import { redisClient } from "../redis/redis";
import { config } from "../config";
import { Consumption } from "../ratelimiter/leakybucket";

export async function isAllowed(key: string): Promise<boolean> {
  const now = Date.now();
  const data = await redisClient.hGetAll(key);

  const result = Consumption(
    config.rateLimit,
    {
      bucketLevel: Number(data.bucket_level || 0),
      lastCheckedTime: Number(data.last_checked_time || now)
    },
    now
  );

  if (!result.allowed) {
    return false;
  }

  await redisClient.hSet(key, {
    bucket_level: result.newBucket.bucketLevel.toString(),
    last_checked_time: now.toString()
  });

  await redisClient.expire(key, config.rateLimit.ttl);

  return true;
}