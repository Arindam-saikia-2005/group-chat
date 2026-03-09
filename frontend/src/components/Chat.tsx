import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket/socket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Chat() {
  const { groupId } = useParams<{ groupId: string }>();

  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!groupId) return;

    socket.emit("join_group", groupId);

    socket.on("receive_message", (message) =>
      setMessages((prev) => [...prev, message]),
    );

    socket.on("user_typing", ({ userId }) =>
      setTypingUsers((prev) => [...new Set([...prev, userId])]),
    );

    socket.on("user_stop_typing", ({ userId }) =>
      setTypingUsers((prev) => prev.filter((u) => u !== userId)),
    );

    socket.on("online_users", (users) => setOnlineUsers(users));

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
      socket.off("online_users");
    };
  }, [groupId]);

  return <div style={{ width:"400px", margin:"auto" }}>
     <p className="text-3xl font-semibold">Group chat</p>
     <p>Online users : {onlineUsers.length}</p>

     <MessageList  messages={messages}/>

     {typingUsers.length > 0 && <p>Someone is typing...</p>}

     <MessageInput groupId={groupId!}/>
  </div>;
}
