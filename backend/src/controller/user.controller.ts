import type { Request, Response } from "express";
import { User } from "../model/user.model.js";



export const searchUsers = async(req:Request,res:Response) => {
  try {
     const keyword = req.query.q ? { name : { $regex : req.query.q,
      $options: "i"},
    } : {};

    const users =  await User.find({ ...keyword, _id : {$ne : req.user!.id}  }).select("name email")
    res.json({users})
  } catch (error:any) {
    console.error(error.message);
    res.status(500).json({msg:"Internal server error"})
  }
}


export const getUserById = async(req:Request,res:Response) => {
  try {
    const id = req.params.id as string;
    const user = await User.findById({id})
    if(!user) return res.status(404).json({msg:"user not found"});
    res.status(200).json({user})
  } catch (error:any) {
    console.error(error.message)
    res.status(500).json({
        msg:"Internal server error"
    })
  }
}