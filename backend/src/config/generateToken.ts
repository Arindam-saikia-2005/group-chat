import jwt from "jsonwebtoken";


export const generateToken = (id:string,name:string) =>{
  return  jwt.sign({id,name},process.env.JWT_SECRET!,{
    expiresIn:"7d"
  });
};

