import express from "express";
import { login, register } from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";


export const authRouter =  express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/me",protect);