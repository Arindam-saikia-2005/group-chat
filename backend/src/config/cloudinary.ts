import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const CLOUD_API_NAME = process.env.CLOUDINARY_API_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_API_NAME || !API_KEY || !API_SECRET || CLOUD_API_NAME.trim() === "" || API_KEY.trim() === "" || API_SECRET.trim() === "") {
  throw new Error("Please provide all Cloudinary config values in .env file");
}

cloudinary.config({
  cloud_name: CLOUD_API_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});