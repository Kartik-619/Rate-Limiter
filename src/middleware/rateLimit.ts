import { Request, Response, NextFunction } from "express";
import { isAllowed } from "../limiter/leak&bucket";

export async function rateLimiter(
  req: Request,//represents incoming http request
  res: Response,//used to send the http response
  next: NextFunction//tells express to continue to the next step
) {

  //it allows to rate limiting to any route
  //here we are doing the Ip based rate limitng....to get some identity
  const ip = req.ip;
  //creates a unique redis key per client to create a unique id
  const key = `rate_limit:${ip}`;

  const allowed = await isAllowed(key);

  if (!allowed) {
    return res.status(429).json({ error: "Too many requests" });
  }

  next();
}
