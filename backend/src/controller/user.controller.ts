import type { Request, Response } from "express";
import { User } from "../model/user.model.js";
import { v2 as cloudinary } from "cloudinary"


export const searchUsers = async (req: Request, res: Response) => {
  try {
    const keywordFilter = req.query.q ? {
      $or: [
        { name: { $regex: req.query.q as string, $options: "i" } },
        { email: { $regex: req.query.q as string, $options: "i" } }
      ]
    } : {};

    const users = await User.find({
      ...keywordFilter,
      _id: { $ne: req.user?.id as string }
    }).select("name email")

    res.json({ users })
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" })
  }
}


export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await User.findById(id)
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
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const user = await User.findByIdAndUpdate(userId, {
      profilePic: uploadResponse.secure_url
    }, {
      returnDocument: "after"
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user)
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ err: "Internal server error" })
  }
}

export const editUserDetails = async (req: Request, res: Response) => {
  try {
    let { profilePic, name } = req.body;
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found!" })
    }

    if (name) {
      user.name = name;
    }

    if (profilePic) {
      if (user.profilePic) {
        try {
          const urlParts = user.profilePic.split("/");
          const lastPart = urlParts[urlParts.length - 1];
          if (!lastPart) {
            throw new Error("Failed to parse public ID from profilePic URL");
          }
          const publicId = lastPart.split(".")[0];
          if (!publicId) {
            throw new Error("Failed to parse public ID from profilePic URL");
          }

          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      user.profilePic = uploadResponse.secure_url;
    }

    await user.save();
    return res.status(200).json(user)

  } catch (err: any) {
    console.error("Error while changing the user details", err.message);
    res.status(500).json({ message: "Internal server error" })
  }
}
