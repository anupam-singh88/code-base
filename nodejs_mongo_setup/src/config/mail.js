import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import nodemailer from "nodemailer";
import config from "./index.js";
import logger from "../utils/logger.js";

const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE || "gmail",
  host: config.MAIL_HOST || "smtp.gmail.com",
  port: config.MAIL_PORT || 587,
  secure: config.MAIL_SECURE ?? false,
  auth: {
    user: config.auth?.MAIL_USER || "",
    pass: config.auth?.MAIL_PASSWORD || "",
  },
  pool: true,
});

transporter.verify((error, success) => {
  if (error) {
    logger.error("SMTP Connection Error:", error);
  } else {
    logger.info("SMTP Connection Verified");
  }
});

export default transporter;
