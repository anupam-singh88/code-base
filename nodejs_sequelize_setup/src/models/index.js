import { sequelize } from "../db/dbConnect.js";
import User from "./User.model.js";

const models = {
  User,
};

// Synchronize all models with the database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};

export { models, syncModels };
