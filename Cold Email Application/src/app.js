import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import config from "./config/index.js";
import logger from "./utils/logger.js";
import configureCors from "./config/corsConfig.js";

// Middleware imports
import errorHandler from "./middlewares/errorHandler.middleware.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import createBasicRateLimiter from "./middlewares/rateLimiting.js";
import { urlVersioning } from "./middlewares/apiVersioning.js";

// Route imports
import apiRouter from "./routes/api_router.js";

const app = express();

// Security & Performance Middleware
app.use(configureCors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(compression()); // Compress all responses
app.use(express.json({ limit: "500kb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "500kb" })); // Parse URL-encoded bodies
app.use(express.static(config.STATIC_FILES_DIR || "public")); // Serve static files
app.use(
  cookieParser(config.COOKIE_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  })
); // Parse cookies

// Logging
app.use(morgan("combined", { stream: logger.stream }));

// Rate Limiting
app.use(createBasicRateLimiter());

// API Versioning
app.use(urlVersioning("v1"));

// API Routes
const apiVersion = config.API_VERSION || "/api/v1";
app.use(apiVersion, apiRouter);

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
