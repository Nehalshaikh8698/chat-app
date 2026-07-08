/**
 * ============================================================================
 * Cloudinary Configuration
 * ============================================================================
 *
 * This file initializes Cloudinary.
 * All uploads (profile pictures, chat images, files, etc.)
 * will use this configuration.
 */

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

/**
 * Validate required environment variables.
 */
const requiredEnv = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`);
  }
});

/**
 * Configure Cloudinary
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 *
 * Returns:
 * secure_url
 */
export const uploadImage = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: "chat-app/profile-images",
    resource_type: "image",
  });

  return result.secure_url;
};

/**
 * Delete image
 *
 * Useful when user changes profile picture.
 */
export const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;