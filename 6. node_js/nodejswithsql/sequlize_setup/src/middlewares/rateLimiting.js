import rateLimit from "express-rate-limit";
import logger from "../utils/logger.js"; 

const createBasicRateLimiter = (maxRequests = 100, time = 15 * 60 * 1000) => {
  return rateLimit({
    max: maxRequests, // Maximum number of requests
    windowMs: time, // Time window in milliseconds
    message: { error: "Too many requests, please try again later" },
    standardHeaders: true, // Send rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers (deprecated)

    handler: (req, res) => {
      logger.warn(`Rate limit exceeded for ${req.ip} on ${req.originalUrl}`); // Log when rate-limiting occurs

      res.status(429).json({
        success: false,
        message: "Too many requests, please slow down.",
      });
    },

    skip: (req) => {
      // Optionally, skip rate-limiting for certain routes or IPs
      const trustedIps = ["127.0.0.1"]; // Example IPs to whitelist
      return (
        trustedIps.includes(req.ip) || req.originalUrl === "/api/healthcheck"
      ); // Exclude healthcheck from rate-limiting
    },
  });
};

export default createBasicRateLimiter;
