import { Server, Socket } from "socket.io"
import type { clientToServerEvents, serverToClientEvents } from "./types.js"
import { Group } from "../model/group.model.js";
import { Message } from "../model/message.model.js";
import { getOnelineUsers } from "../index.js";

export const registerChatHandlers = (io: Server<clientToServerEvents, serverToClientEvents>, socket: Socket<clientToServerEvents, serverToClientEvents>) => {
    const user = socket.data.user;

    // JOIN GROUP
    socket.on("join_group",async(groupId) => {
      const group = await Group.findById(groupId);
      if(!group) return;

      const isMember = group.members.some((member) => member.toString() === user._id.toString());

      if(!isMember) return;
      socket.join(groupId);
    })

    // LEAVE GROUP
    socket.on("leave_group",(groupId) => {
      socket.leave(groupId);
    })

    // SEND MESSSAGE
    socket.on("send_message",async({ groupId,content,type }) => {
      const group =  await Group.findById(groupId);
      if(!group) return;

      const isMember = group.members.some((member) =>member.toString() === user._id.toString())

      if(!isMember) return;

      const message =  await Message.create({
        group:groupId,
        sender:user._id,
        content,
        type:type || "text",
        readBy:[user._id]
      });

      const populated = await message.populate("sender", "name");
      io.to(groupId).emit("receive_message", populated);
    });

    // DELETE MESSAGE
    socket.on("delete_message",async({messageId,groupId})=>{
      await Message.findByIdAndDelete(messageId);
      io.to(groupId).emit("message_deleted",{messageId,groupId})
    })

    // Typing
    socket.on("typing", (groupId,username) => {
      socket.to(groupId).emit("user_typing", {
        userId: user._id.toString(),
        username:username || user.name,
        groupId,
      });
    });

    socket.on("stop_typing", (groupId) => {
      socket.to(groupId).emit("user_stop_typing", {
        userId: user._id.toString(),
        groupId,
      });
    });

    socket.on("request_online_users", async () => {
  socket.emit("online_users", await getOnelineUsers());
});



    // Mark as read
    socket.on("mark_read",async({messageId}) => {
       await Message.findByIdAndUpdate(messageId,{
        $addToSet:{
          readBy:user._id
        },
       })
    })
}