import { useState } from "react";
import { socket } from "../socket/socket";
import { jwtDecode } from "jwt-decode";

export default function MessageInput({ groupId }: { groupId: string }) {
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  let username = "Anonymous";

  if (token) {
    const decoded: any = jwtDecode(token);
    username = decoded?.name ?? "Anonymous";
  }


  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      groupId,
      content: message,
      type: "text",
    });
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", groupId, username);

    setTimeout(() => {
      socket.emit("stop_typing", groupId);
    }, 1000);
  };

  return (
    <div className="flex space-x-3">
      <input
        className="w-full p-3"
        type="text"
        value={message}
        onChange={(e) => {
          (setMessage(e.target.value), handleTyping());
        }}
        placeholder="Type messages...."
      />

      <button
        className="bg-green-600 rounded-md px-4 py-2 border border-black"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
