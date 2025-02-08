import rateLimit from "express-rate-limit";
import logger from "../utils/logger.js";
import config from "../config/index.js";

const trustedIps = (config.TRUSTED_IPS || "127.0.0.1").split(",");

const createBasicRateLimiter = (maxRequests = 100, time = 15 * 60 * 1000) => {
  return rateLimit({
    max: maxRequests,
    windowMs: time,
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
      logger.warn(
        `Rate limit exceeded: ${req.method} ${req.originalUrl} from ${req.ip}`
      );
      res.status(429).json({
        success: false,
        message: "Too many requests, please slow down.",
      });
    },

    skip: (req) =>
      trustedIps.includes(req.ip) || req.originalUrl === "/api/healthcheck",
  });
};

export default createBasicRateLimiter;
