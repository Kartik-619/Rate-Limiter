import { createClient } from "redis";
import { config } from "../config";

export const redisClient = createClient({ url: config.redisUrl });

//setting up an event listener to handle errors
redisClient.on("error",(err)=>{
    console.log("redis error",err);
});

//function for secure connection
export async function connectRedis() {
    await  redisClient.connect();//calling redis connect method to asycnorously connect to the server
    console.log("Redis connected");
}