import { Schema,Types,Document, model  } from "mongoose";

export interface IMessage extends Document {
    _id:Types.ObjectId;
    group:Types.ObjectId;
    sender:Types.ObjectId;
    content:string;
    type:"text" | "image";
    readBy:Types.ObjectId[];
    createdAt:Date;
    updateAt:Date
}

const messageSchema = new Schema<IMessage>({
   group:{
    type:Schema.Types.ObjectId,
    ref:"Group",
    required:true
   },
   sender:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   content:{
    type:String,
    required:true
   },
   type:{
    type:String,
    enum:["text","image"],
    default:"text"
   },
   readBy:[
    {
        type:Schema.Types.ObjectId,
        ref:"User"
    }
   ]
},{
    timestamps:true
})

export const Message = model<IMessage>("Message",messageSchema);
