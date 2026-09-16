export interface RateLimitConfig {
  capacity: number;
  leakRate: number;
}

export interface BucketInfo {
  bucketLevel: number;
  lastCheckedTime: number;
}

export function Leaky(
  config: RateLimitConfig,
  bucketInfo: BucketInfo,
  now: number
): BucketInfo {
  const elapsed = (now - bucketInfo.lastCheckedTime) / 1000;
  const leaked = elapsed * config.leakRate;

  return {
    bucketLevel: Math.max(0, bucketInfo.bucketLevel - leaked),
    lastCheckedTime: now
  };
}

export function Consumption(
  config: RateLimitConfig,
  bucketInfo: BucketInfo,
  now: number,
  requests: number = 1
): { allowed: boolean; newBucket: BucketInfo } {
  const leakedBucket = Leaky(config, bucketInfo, now);

  if (leakedBucket.bucketLevel + requests > config.capacity) {
    return { allowed: false, newBucket: leakedBucket };
  }

  return {
    allowed: true,
    newBucket: {
      ...leakedBucket,
      bucketLevel: leakedBucket.bucketLevel + requests
    }
  };
}