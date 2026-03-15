import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import MessageInput from "./MessageInput";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

export default function ChatWindow({ group }: { group: IGroup }) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const token = localStorage.getItem("token");

  let userId = "";

  if (token) {
    const decode: any = jwtDecode(token);
    userId = decode.id;
  }

  
  async function getMessages() {
    try {
      axios
        .get(`http://localhost:8000/api/message/${group._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setMessages(res.data));
    } catch (error: any) {
      console.error(error.message);
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
          </div>
        </div>
      </div>

      {/* messages */}

      <div className="flex-1 p-5 overflow-y-auto bg-[#0b141a] space-y-3">
        {messages.map((msg) => {
          return (
            <div
              key={msg._id}
              className={`w-fit px-4 py-2 rounded-lg text-white text-sm
     ${msg.sender._id === userId ? "bg-[#005c4b] ml-auto" : "bg-[#202c33]"}`}
            >
              {msg.content}
            </div>
          );
        })}
      </div>

      {/* message input */}

      <div className=" gap-3 px-4 py-3 bg-[#202c33]">
        <MessageInput groupId={group._id} />
      </div>
    </div>
  );
}
