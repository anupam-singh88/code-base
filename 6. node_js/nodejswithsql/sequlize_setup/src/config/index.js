import dotenv from "dotenv";
dotenv.config(); 

const requireEnv = (key) => {
  try {
    if (!process.env[key]) {
      throw new Error(`${key} is missing in environment variables.`);
    }
    return process.env[key];
  } catch (error) {
    console.error(`[CONFIG ERROR] Missing environment variable: ${key}`);
    process.exit(1); 
  }
};

const config = Object.freeze({
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  API_VERSION: process.env.API_VERSION || "/api/v1",
  STATIC_FILES_DIR: process.env.STATIC_FILES_DIR || "public",

  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017",
  DB_NAME: process.env.DB_NAME || "defaultDB",

  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "1h",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  ACCESS_TOKEN_SECRET: requireEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: requireEnv("REFRESH_TOKEN_SECRET"),

  PORT: process.env.PORT || 5000,

  CLOUDINARY_CLOUD_NAME: requireEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: requireEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: requireEnv("CLOUDINARY_API_SECRET"),
});

export default config;
