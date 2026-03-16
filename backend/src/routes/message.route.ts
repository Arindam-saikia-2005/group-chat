import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { deleteMessage, getMessages } from "../controller/message.controller.js";

export  const messageRouter =  express.Router();

messageRouter.get("/:groupId",protect,getMessages);
messageRouter.delete("/:messageId",protect,deleteMessage);