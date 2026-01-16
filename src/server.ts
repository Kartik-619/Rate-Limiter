import express from "express";
import { connectRedis } from "./redis/redis";
import { rateLimiter } from "./middleware/rateLimit";

const app = express();

app.use(express.json());

app.get("/api/data", rateLimiter,(req, res) => {
  res.json({ message: "Request allowed" });
});

async function start(){
  
  await connectRedis();
  app.listen(3008, () => {
  console.log("Server running on 3008");
  });
}

start();
