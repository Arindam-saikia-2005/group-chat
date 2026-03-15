import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface JwtPayload {
  id: string;
}

export const protect = (req:Request,res:Response,next:NextFunction) => {
   const token = req.headers.authorization?.split(" ")[1];

   if(!token) return res.status(401).json({err:"unAuthorized"});

   try {
    const decode  = jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload ;

    req.user = {
      id:decode.id
    }
    next()
   } catch (error:any) {
    console.error(error.message);
    res.status(500).json({err:"Internal server error"})
   }
}
