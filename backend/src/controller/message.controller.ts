import type { Request, Response } from "express";
import { Group } from "../model/group.model.js";
import { Types } from "mongoose";
import { Message } from "../model/message.model.js";

export const getMessages = async(req:Request,res:Response) => {
    try {
        const group = await Group.findById(req.params.groupId);

        // if(!group?.members.includes(new Types.ObjectId(req.user?.id))) {
        //     return res.status(403).json({msg:"Forbidden"})
        // } 

        const messages = await Message.find({group:req.params.groupId as string}).populate("sender", "name").sort({createdAt:-1});

        res.json(messages.reverse())
    } catch (error:any) {
        console.error("Error while getting the message",error.message);
        res.status(500).json({msg:"Internal server error"})
    }
}

export const deleteMessage = async(req:Request,res:Response) => {
    try {
        const message =  await Message.findById(req.params.messageId as string);
        if(!message) {
            return res.status(404).json({msg:"Message not found"})
        }

        if(message.sender.toString() !== req.user?.id) {
            return res.status(403).json({msg:"Forbidden"})
        }

        await message.deleteOne();

        res.json({message:"Message deleted successfully"});
    } catch (error:any) {
        console.error("Error while deleting a message",error.message);
        res.status(500).json({ msg:"Internal server error"})
    }
}