import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import Logger from "../utils/logger.js";
import config from "../config/index.js";

// Check environment variables early and throw an error immediately if missing
const validateCloudinaryConfig = () => {
  if (
    !config.CLOUDINARY_CLOUD_NAME ||
    !config.CLOUDINARY_API_KEY ||
    !config.CLOUDINARY_API_SECRET
  ) {
    Logger.error(
      "Cloudinary configuration is missing in environment variables."
    );
    throw new Error(
      "Cloudinary configuration is missing in environment variables."
    );
  }
};

validateCloudinaryConfig();

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// Constants for resource types
const RESOURCE_TYPE_IMAGE = "image";
const RESOURCE_TYPE_VIDEO = "video";

const uploadOnCloudinary = async (
  localFilePath,
  resourceType = RESOURCE_TYPE_IMAGE
) => {
  if (!localFilePath) {
    Logger.error("Local file path is required.");
    throw new Error("Local file path is missing.");
  }

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });

    Logger.info(`File uploaded to Cloudinary: ${result.url}`);
    await fs.unlink(localFilePath); // Remove file from local storage after upload
    return result;
  } catch (error) {
    Logger.error("Cloudinary upload failed:", error.message);

    // If it's a network error or Cloudinary-specific issue, handle it separately
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      Logger.error("Network error while uploading to Cloudinary");
    } else if (error.statusCode === 400) {
      Logger.error("Bad request error from Cloudinary");
    }

    await safeDelete(localFilePath); // Safely delete the file in case of failure
    throw new Error("Cloudinary upload failed. Please try again.");
  }
};

const deleteOnCloudinary = async (
  public_id,
  resource_type = RESOURCE_TYPE_IMAGE
) => {
  if (!public_id) {
    Logger.error("Public ID is required for deletion.");
    throw new Error("Public ID is missing.");
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type,
    });

    Logger.info(`File deleted from Cloudinary: ${public_id}`);
    return result;
  } catch (error) {
    Logger.error("Cloudinary deletion failed:", error.message);

    // Handle different types of error responses
    if (error.statusCode === 404) {
      Logger.warn("File not found on Cloudinary");
    } else if (error.statusCode === 500) {
      Logger.error("Internal Server Error during Cloudinary deletion");
    }

    throw new Error("Cloudinary deletion failed. Please try again.");
  }
};

// Utility to handle safe file deletion
const safeDelete = async (filePath) => {
  try {
    await fs.unlink(filePath);
    Logger.info(`Local file deleted: ${filePath}`);
  } catch (error) {
    Logger.warn(`Failed to delete local file: ${filePath}`, error.message);
  }
};

export { uploadOnCloudinary, deleteOnCloudinary, safeDelete };
