import type { Request, Response } from "express";
import { User } from "../model/user.model.js";
import { v2 as cloudinary } from "cloudinary"


export const searchUsers = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.q ? {
      name: {
        $regex: req.query.q,
        $options: "i"
      },
    } : {};

    const users = await User.find({ keyword, _id: { $ne: req.user?.id as string } }).select("name email")
    res.json({ users })
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" })
  }
}


export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await User.findById({ id })
    if (!user) return res.status(404).json({ msg: "user not found" });
    res.status(200).json({ user })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({
      msg: "Internal server error"
    })
  }
}

export const AllUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const users = await User.find({
      _id: { $ne: userId }
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No user found!" });
    }

    res.status(200).json({
      users
    });

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const uploadUserProfilePic = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "profilePic is required!" })
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const user = await User.findByIdAndUpdate(req.user?.id, {
      profilePic: uploadResponse.secure_url
    }, {
      returnDocument:"after"
    })
    res.status(200).json(user)
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ err: "Internal server error" })
  }
}
