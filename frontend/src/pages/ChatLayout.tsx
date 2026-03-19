import {useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function ChatLayout({setToken} : {setToken : React.Dispatch<React.SetStateAction<string | null>> }) {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);


  return (
    <div className="flex h-screen bg-[#111b21]">
      <Sidebar selectedGroup={setSelectedGroup} setToken={setToken} />
      <ChatWindow group={selectedGroup} setSelectedGroup={setSelectedGroup} />
    </div>
  );
}
