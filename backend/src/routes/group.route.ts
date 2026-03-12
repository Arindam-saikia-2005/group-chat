import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addMembers,createGroup, deleteGroup, demoteAdmin, getGroupById, promoteAdmin, removeMember, updateGroupName, usersAllGroups } from "../controller/group.controller.js";

export const groupRoute = express.Router();

groupRoute.post("/create",protect,createGroup);
groupRoute.get("/:groupId",protect,getGroupById);
groupRoute.get("/",protect,usersAllGroups)
groupRoute.patch("/:groupId/name",protect,updateGroupName);
groupRoute.post("/:groupId/members",protect,addMembers);
groupRoute.patch("/:groupId/promote-admin",protect,promoteAdmin);
groupRoute.patch("/groupId/demote-admin",protect,demoteAdmin)
groupRoute.delete("/:groupId/members/:userId",protect,removeMember,)
groupRoute.delete("/:groupId",protect,deleteGroup);