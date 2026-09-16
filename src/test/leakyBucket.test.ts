import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Leaky, Consumption, type BucketInfo, type RateLimitConfig } from "../ratelimiter/leakybucket";

const config: RateLimitConfig = { capacity: 10, leakRate: 1 };
const empty: BucketInfo = { bucketLevel: 0, lastCheckedTime: 0 };

describe("Leaky", () => {
  it("leaks tokens proportionally to elapsed time", () => {
    const result = Leaky(config, { bucketLevel: 5, lastCheckedTime: 0 }, 3000);
    assert.equal(result.bucketLevel, 2);
    assert.equal(result.lastCheckedTime, 3000);
  });

  it("never goes below zero", () => {
    const result = Leaky(config, { bucketLevel: 1, lastCheckedTime: 0 }, 5000);
    assert.equal(result.bucketLevel, 0);
  });
});

describe("Consumption", () => {
  it("allows a request when the bucket has room", () => {
    const result = Consumption(config, empty, 0);
    assert.equal(result.allowed, true);
    assert.equal(result.newBucket.bucketLevel, 1);
  });

  it("rejects when the bucket is over capacity", () => {
    const full: BucketInfo = { bucketLevel: 10, lastCheckedTime: 0 };
    const result = Consumption(config, full, 0);
    assert.equal(result.allowed, false);
  });

  it("accounts for multiple requests", () => {
    const result = Consumption(config, empty, 0, 3);
    assert.equal(result.allowed, true);
    assert.equal(result.newBucket.bucketLevel, 3);
  });

  it("rejects multiple requests that exceed capacity", () => {
    const result = Consumption(config, { bucketLevel: 8, lastCheckedTime: 0 }, 0, 3);
    assert.equal(result.allowed, false);
  });

  it("accommodates a burst after tokens leak", () => {
    const result = Consumption(
      config,
      { bucketLevel: 10, lastCheckedTime: 0 },
      5000,
      1
    );
    assert.equal(result.allowed, true);
    assert.equal(result.newBucket.bucketLevel, 6);
  });
});