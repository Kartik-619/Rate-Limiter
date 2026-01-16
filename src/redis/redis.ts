import {createClient} from "redis";//initializing a new client instance for redis

//creating a new redis client
export const redisClient=createClient();

//setting up an event listener to handle errors
redisClient.on("error",(err)=>{
    console.log("redis error",err);
});

//function for secure connection
export async function connectRedis() {
    await  redisClient.connect();//calling redis connect method to asycnorously connect to the server
    console.log("Redis connected");
}