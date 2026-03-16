import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import MessageInput from "./MessageInput";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

interface IMessage {
  _id: string;
  group: string;
  sender: { _id: string; name?: string };
  content: string;
  type: "text" | "image";
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface IGroup {
  _id: string;
  name: string;
  admins: string[];
  members: IMember[];
  groupDp: string;
}

interface IMember {
  name: string;
  profilePic: string;
}

interface ITypingUser {
  id: string;
  username: string;
}

export default function ChatWindow({ group }: { group: IGroup | null }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<ITypingUser[]>([]);

  const token = localStorage.getItem("token");

  let userId = "";

  if (token) {
    const decode: any = jwtDecode(token);
    userId = decode.id;
  }

  async function deleteMessage(messageId: string) {
    if (!group) return;
    try {
      await axios.delete(`http://localhost:8000/api/message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      socket.emit("delete_message", {
        messageId,
        groupId: group._id,
      });
      toast.success("message deleted successfully!");
    } catch (error: any) {
      console.error(error?.message || error);
      toast.error("Failed to delete message");
    }
  }

  async function getMessages() {
    if (!group) return;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/message/${group._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessages(res.data);
    } catch (error: any) {
      console.error(error?.message || error);
    }
  }

  useEffect(() => {
    getMessages();
  }, [group]);

  useEffect(() => {
    if (group?._id) {
      socket.emit("join_group", group._id);

      return () => {
        socket.emit("leave_group", group._id);
      };
    }
  }, [group]);

  useEffect(() => {
    if (group?._id) {
      // const handleMessage = (msg: IMessage) => {
      //   if (msg.group === group._id) {
      //     setMessages((prev) => [...prev, msg]);
      //   }
      // };

      socket.on("receive_message", getMessages);

      return () => {
        socket.off("receive_message", getMessages);
      };
    }
  }, [group]);

  useEffect(() => {
    const handleMessgeDeleted = ({ messageId }: { messageId: string }) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    };
    socket.on("message_deleted", handleMessgeDeleted);

    return () => {
      socket.off("message_deleted", handleMessgeDeleted);
    };
  }, []);

  useEffect(() => {
    const handleTyping = ({
      userId,
      username,
    }: {
      userId: string;
      username: string;
      groupId: string;
    }) => {
      setTypingUsers((prev) => {
        if (prev.find((u) => u.id === userId)) return prev;
        return [...prev, { id: userId, username }];
      });
    };

    const handleStopTyping = ({
      userId,
    }: {
      userId: string;
      groupId: string;
    }) => {
      setTypingUsers((prev) => prev.filter((u) => u.id !== userId));
    };

    socket.on("user_typing", handleTyping);
    socket.on("user_stop_typing", handleStopTyping);

    return () => {
      socket.off("user_typing", handleTyping);
      socket.off("user_stop_typing", handleStopTyping);
    };
  }, []);

  if (!group) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a group
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* chat header */}

      <div className="flex items-center gap-3 px-5 py-3 bg-[#202c33] border-b border-gray-700">
        <img src={group.groupDp} className="w-10 h-10 rounded-full" />

        <div>
          <p className="text-white font-bold">{group.name}</p>

          <div className="flex gap-2 flex-wrap">
            {group.members.map((m: IMember, i: number) => (
              <span key={i} className="text-gray-400 text-xs">
                {m.name}
              </span>
            ))}
            <div className="flex items-center gap-2 text-gray-400 text-sm px-5">
              <span>
                {typingUsers.map((u) => u.username).join(", ")} typing
              </span>
              <div className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* messages */}

      <div className="flex-1 p-5 overflow-y-auto bg-[#0b141a] space-y-3">
        {messages.map((msg) => {
          return (
            <div
              key={msg._id}
              className={`w-fit flex gap-2 px-4 py-2 rounded-lg text-white text-sm
     ${msg.sender._id === userId ? "bg-[#005c4b] ml-auto" : "bg-[#202c33]"}`}
            >
              {msg.content}
              <MdDelete onClick={() => deleteMessage(msg._id)} size={20} />
            </div>
          );
        })}
        {typingUsers.length > 0 && (
          <div className="text-xs text-gray-300">
            {typingUsers.map((u) => u.username).join(", ")} typing...
          </div>
        )}
      </div>

      {/* message input */}

      <div className=" gap-3 px-4 py-3 bg-[#202c33]">
        <MessageInput groupId={group._id} />
      </div>
    </div>
  );
}
