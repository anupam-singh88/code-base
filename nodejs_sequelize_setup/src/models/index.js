import { sequelize } from "../db/dbConnect.js";
import User from "./User.model.js";
import logger from "../utils/logger.js";

const models = {
  User,
};

// Synchronize all models with the database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    logger.info("All models were synchronized successfully.");
  } catch (error) {
    logger.error("Error synchronizing models:", error);
  }
};

export { models, syncModels };