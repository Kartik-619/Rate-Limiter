import express from "express";
import { connectRedis } from "./redis/redis";
import { rateLimiter } from "./middleware/rateLimit";
import { config } from "./config";

const app = express();

app.use(express.json());

app.get("/api/data", rateLimiter, (req, res) => {
  res.json({ message: "Request allowed" });
});

async function start() {
  await connectRedis();
  app.listen(config.port, () => {
    console.log(`Server running on ${config.port}`);
  });
}

start();
