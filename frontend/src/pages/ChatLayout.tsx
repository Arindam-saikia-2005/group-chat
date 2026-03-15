import {useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function ChatLayout() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);


  return (
    <div className="flex h-screen bg-[#0b141a]">
      <Sidebar selectedGroup={setSelectedGroup} />
      <ChatWindow group={selectedGroup} />
    </div>
  );
}
