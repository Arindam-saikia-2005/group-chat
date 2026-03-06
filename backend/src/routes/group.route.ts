import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addMembers, createGroup, deleteGroup, getGroupById, removeMember, updateGroupName } from "../controller/group.controller.js";

export const groupRoute = express.Router();

groupRoute.post("/create",protect,createGroup);
groupRoute.get("/:groupId",protect,getGroupById);
groupRoute.patch("/:groupId/name",protect,updateGroupName);
groupRoute.post("/:groupId/members",protect,addMembers);
groupRoute.delete("/:groupId/members/:userId",protect,removeMember,)
groupRoute.delete("/:groupId",protect,deleteGroup);