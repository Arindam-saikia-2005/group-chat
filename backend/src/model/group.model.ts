import {  Schema,model,Types,Document } from "mongoose";

export interface IGroup extends Document {
    _id:Types.ObjectId;
    name:string;
    members:Types.Array<Types.ObjectId>;
    admins:Types.Array<Types.ObjectId>;
    createdBy:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}

const groupSchema = new Schema<IGroup>({
    name: {
        type:String,
        required:true,
        unique:true
    },
    members:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    admins:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true
})

export const Group = model<IGroup>("Group",groupSchema);
