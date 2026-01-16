import {createClient} from "redis";//initializing a new client instance for redis
import { redisClient } from "../redis/redis";

const CAPACITY = 10;
const LEAK_RATE = 1; // tokens/sec
//max 10 requests can be stored
//1 request per second of processing

export async function isAllowed(key: string): Promise<boolean>{
    const now = Date.now();
    const data=await redisClient.hGetAll(key);
    //it fetches bucket level and the last checked time
    let bucket = Number(data.bucket_level || 0);
    let last = Number(data.last_checked_time || now);
    //now we are normalizing the redis data

    //calculating the elapsed time
    const elapsed = (now - last) / 1000;
    //calculating hte leak token
    const leaked = elapsed * LEAK_RATE;
    bucket = Math.max(0, bucket - leaked);
    if (bucket + 1 > CAPACITY) {
        return false;
      }
      bucket += 1;

      //persist the updated state 
      //next request needs the updated state and redis is stored across servers
      await redisClient.hSet(key, {
        bucket_level: bucket.toString(),
        last_checked_time: now.toString()
      });

      //if client stops sending requests bucket auto deletes after 60s
      await redisClient.expire(key, 60);

      return true;
}
