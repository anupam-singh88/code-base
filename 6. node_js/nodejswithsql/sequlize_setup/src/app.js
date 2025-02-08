import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import logger from "./utils/logger.js";

import config from "./config/index.js";
import configureCors from "./config/corsConfig.js";

// Middleware imports
import errorHandler from "./middlewares/errorHandler.middleware.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import createBasicRateLimiter from "./middlewares/rateLimiting.js";
import { urlVersioning } from "./middlewares/apiVersioning.js";

// Route imports
// import healthCheckRouter from "./routes/healthCheck.js";

const app = express();

// Security & Performance Middleware
app.use(configureCors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ extended: true, limit: "500kb" }));
app.use(express.static(config.STATIC_FILES_DIR || "public"));
app.use(
  cookieParser(config.COOKIE_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  })
);

// Logging
app.use(morgan("combined", { stream: logger.stream }));

// Rate Limiting
app.use(createBasicRateLimiter());

// API Versioning
app.use(urlVersioning("v1"));

// API Routes
const apiVersion = config.API_VERSION || "/api/v1";
// app.use(apiVersion, healthCheckRouter);

// Handle undefined routes (404)
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Graceful shutdown handling
process.on("SIGINT", async () => {
  logger.info("Shutting down server gracefully...");
  process.exit(0);
});

export default app;
