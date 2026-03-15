import type { Request, Response } from "express";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/generateToken.js";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const alreadyExist = await User.findOne({ email })

    if (alreadyExist) return res.status(400).json({ msg: "user already exist with this email" })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword
    })
    res.status(201).json({
      token: generateToken(user._id.toString())
    })
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ msg: "Error while registering an user" })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "incorrect email and password" });

    res.json({
      token: generateToken(user._id.toString())
    });
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({
      msg: "Internal server error"
    })
  }
}

export const me = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    res.json(user)
  } catch (error: any) {
    console.error(console.error);
    res.status(500).json({
      msg: "Internal server error"
    })
  }
}
