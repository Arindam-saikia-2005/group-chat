import express from "express"
import { getUserById, searchUsers } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

export const userRoute = express.Router();

userRoute.get("/search",protect,searchUsers)
userRoute.get("/:id",protect,getUserById)