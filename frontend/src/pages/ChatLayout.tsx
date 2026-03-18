import {useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function ChatLayout() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);


  return (
    <div className="flex h-screen bg-[#4c7591]">
      <Sidebar selectedGroup={setSelectedGroup} />
      <ChatWindow group={selectedGroup} setSelectedGroup={setSelectedGroup} />
    </div>
  );
}
