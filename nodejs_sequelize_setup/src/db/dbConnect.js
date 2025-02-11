import { Sequelize } from "sequelize";
import logger from "../utils/logger.js";
import config from "../config/index.js";

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = config;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST || !DB_PORT) {
  logger.error("Missing database configuration for Sequelize.");
  throw new Error("Database connection failed due to missing configuration.");
}

// const DB_NAME = "school";
// const DB_USER = "root";
// const DB_PASS = "1234";
// const DB_HOST = "localhost";
// const DB_PORT = 3306;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql", // Change this to mysql, sqlite, mariadb, or mssql based on your DB
  logging: (msg) => logger.debug(msg), // Enable logging for debugging
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected successfully.");
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    throw error;
  }
};

export default connectToDB;
