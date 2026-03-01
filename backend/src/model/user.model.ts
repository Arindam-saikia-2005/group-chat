import { Schema,model,Document, Types, mongo } from "mongoose";


export interface IUser extends Document{
    _id:Types.ObjectId;
     name:string;
     email:string;
     password:string;
     profilePic?:string;
     isOnline:boolean;
     lastSeen:Date;
     createdAt:Date;
     updatedAt:Date;
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        reqiured:true,
    },
    profilePic:{
        type:String
    },
    isOnline:{
        type:Boolean
    },
    lastSeen:{
        type:Date,
        default:Date.now()
    },
},{
    timestamps:true
})

export const User = model<IUser>("User",userSchema);

