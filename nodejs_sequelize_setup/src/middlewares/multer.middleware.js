import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Ensure the directory exists asynchronously
const uploadDir = path.resolve("public/temp");
fs.promises.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Define allowed file types (example: images or PDFs)
const allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
const mimeTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to 'public/temp' directory
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    cb(null, `${uniqueSuffix}${fileExtension}`); // Securely rename file
  },
});

// File filter for type validation
const fileFilter = (req, file, cb) => {
  const isAllowed =
    allowedFileTypes.test(path.extname(file.originalname).toLowerCase()) &&
    mimeTypes.includes(file.mimetype);

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only image or PDF files are allowed."), false);
  }
};

// Set file size limit (10MB)
const fileSizeLimit = 10 * 1024 * 1024; // 10MB

// Multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: fileSizeLimit },
});
