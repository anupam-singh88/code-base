import cors from "cors";
import config from "./index.js";

const allowedOrigins = config.CORS_ORIGIN ? config.CORS_ORIGIN.split(",") : [];

const configureCors = () =>
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error(`CORS Policy: ${origin} is not allowed`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 204,
  });

export default configureCors;
