import type { Request, Response } from "express";
import { Group } from "../model/group.model.js";
import { Types, type ObjectId } from "mongoose";


export const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, members } = req.body
        const group = await Group.create({
            name,
            members: [...new Set([...members, req.user?.id])],
            admins: [req.user?.id],
            createdBy: req.user?.id
        } as any)
        res.status(201).json({ group })
    } catch (err: any) {
        console.error("Error while creating a group", err.message);
        res.status(500).json({
            msg: "Internal server error"
        })
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