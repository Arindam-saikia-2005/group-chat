import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function ChatLayout() {
    return (
        <div className="flex h-screen bg-[#0b141a]">
          <Sidebar/>
          <ChatWindow/>
        </div>
    )
}