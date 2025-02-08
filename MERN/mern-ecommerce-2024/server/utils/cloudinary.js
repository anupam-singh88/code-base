const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("🚀 ~ uploadOnCloudinary ~ error:", error.message);
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation failed
        return null;
    }
};

const destroyOnCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        console.error("🚀 ~ destroyOnCloudinary ~ error:", error.message);
        return null;
    }
};

module.exports = { uploadOnCloudinary, destroyOnCloudinary };
