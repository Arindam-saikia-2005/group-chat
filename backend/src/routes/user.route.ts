import express from "express"
import { AllUsers, changeUserProfilePic, getUserById, searchUsers,  uploadUserProfilePic } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

export const userRoute = express.Router();

userRoute.get("/search",protect,searchUsers)
userRoute.get("/:id",protect,getUserById)
userRoute.get("/",AllUsers);
userRoute.post("/profile-pic",protect,uploadUserProfilePic);
userRoute.patch("/update-profilePic",protect,changeUserProfilePic)