import type { Request, Response } from "express";
import { Group } from "../model/group.model.js";
import { Types } from "mongoose";
import { v2 as cloudinary } from "cloudinary";


export const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, members,groupDp } = req.body
        const group = await Group.create({
            name,
            members: [...new Set([...members, req.user?.id])],
            admins: [req.user?.id],
            createdBy: req.user?.id,
            groupDp:groupDp || ""
        } as any)
        res.status(201).json({ group })
    } catch (err: any) {
        console.error("Error while creating a group", err.message);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

export const usersAllGroups = async(req:Request,res:Response) => {
    try {
        const userId = req.user?.id;
        const group = await Group.find({members:userId}).populate("members", "name");
        if(!group) {
            return res.json({
                msg:"No group found  with this userId"
            })
        }

        res.status(200).json(group)

    } catch (error:any) {
         console.error(error.message);
         res.status(500).json({message:"Internal server error"})
    }
}

export const getGroupById = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.groupId as string;
        const group = await Group.findById(groupId).populate("members", "name").populate("admins", "name")
        if (!group) return res.status(404).json({ msg: "group not found" })
        res.status(200).json({ group })
    } catch (err: any) {
        console.error("Error while getting a group By id ", err.message);
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateGroupName = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.groupId as string;
        const group = await Group.findById(groupId)
        if (!group) return res.status(400).json({ msg: "Group not found" });

        if (!group.admins.includes(new Types.ObjectId(req.user?.id))) {
            return res.status(403).json({ msg: "Only admin can update" })
        }

        group.name = req.body.name
        await group.save();

        res.json(group)

    } catch (err: any) {
        console.error("Error while changing the group name", err.message);
        res.status(500).json({ msg: "Internal server error" })
    }
}


 
export const addMembers = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const group = await Group.findById(req.params.groupId)
        if (!group) {
            return res.status(404).json({ err: "group not found!" })
        }
        if (!group.admins.includes(new Types.ObjectId(req.user?.id))) {
            return res.status(403).json({
                msg: "only admin can add members"
            })
        }

        if (group.members.includes(userId)) {
            return res.json({
                msg: "user already added "
            })
        }

        group.members.addToSet(userId);
        await group.save()

        res.json({ group })
    } catch (error: any) {
        console.error("Error while adding members", error.message);
        res.status(500).json({ err: "Internal server error" })
    }
}

export const promoteAdmin = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.groupId as string;
        const userId = req.body.userId as string;

        const group = await Group.findById(groupId)
        if (!group) {
            return res.status(404).json({ msg: "group not found!" })
        }

        if (!group.admins.includes(new Types.ObjectId(req.user?.id))) {
            return res.json(403).json({
                msg: "Only Admin can do it"
            })
        }

        const isMember = group.members.some((member) => member.toString() === userId)

        if (!isMember) {
            return res.status(400).json({
                msg: "User not a group member"
            })
        }

        const alreadyAdmin = group.admins.some((admin) => admin.toString() === userId);

        if (alreadyAdmin) {
            return res.status(400).json({
                msg: "User already an admin"
            })
        }

        group.admins.push(userId);

        await group.save()

        const updatedGroup = await Group.findById(groupId).populate("members", "name").populate("admins", "name");

        res.json({
            message: 'User promoted to admin',
            group: updatedGroup
        })

    } catch (err: any) {
        console.error("Error while promting an user to admin role", err.message);
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const demoteAdmin = async(req:Request,res:Response) => {
    try {
        const groupId = req.params.groupId as string;
        const userId = req.body.userId as string;

        const group = await Group.findById(groupId);

        if(!group) {
            return res.status(404).json({
                message:"group not found"
            })
        }

        const isAdmin = group.admins.some((admin) => admin.toString() ===  req.user?.id);

        if(!isAdmin) {
            return res.status(400).json({message:"Only admin can do it"})
        }

         const isMember = group.members.some((member) => member.toString() === userId)

        if (!isMember) {
            return res.status(400).json({
                msg: "User not a group member"
            })
        }


         group.admins.pull(userId)
         await group.save()

    } catch (error:any) {
        console.error("Error while demoting an user",error.message);
        res.status(500).json({msg:"Internal server error"})
    }
}

export const removeMember = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.groupId as string;
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                msg: "group not found"
            })
        }

        if (!group.admins.includes(new Types.ObjectId(req.user?.id))) {
            return res.status(403).json({ msg: "only admin can do it" })
        }

        group.members.pull(req.params.userId);
        await group.save();

        res.json({
            msg: "user remove successfull"
        })
    } catch (err: any) {
        console.error("error while removing a member", err.message);
        res.status(500).json({ msg: "Internal server error" })
    }
}


export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({
                msg: "group not found"
            })
        }
        if (group.createdBy.toString() !== req.user?.id) {
            return res.status(403).json({
                msg: "only admin can delete the group"
            })
        }

        await group.deleteOne()

        res.json({ msg: "group deleted successfully" })

    } catch (error: any) {
        console.error("Error while deleting the group", error.message);
        res.status(500).json({ msg: "Internal server error" })
    }
}