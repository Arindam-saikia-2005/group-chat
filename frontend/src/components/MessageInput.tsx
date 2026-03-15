import { useState } from "react"
import { socket } from "../socket/socket";


export default function MessageInput({ groupId }:{groupId:string}) {
    const[message,setMessage] = useState("");

    const sendMessage = () => {
        if(!message.trim()) return;
        socket.emit("send_message",{
            groupId,
            content:message,
            type:"text"
        });
        setMessage("");
    }

    const handleTyping = () => {
        socket.emit("typing",groupId);

        setTimeout(() => {
            socket.emit("stop_typing",groupId)
        },1000);
    }
    return (
        <div className="flex space-x-3">
           <input 
           className="w-full p-3"
           type="text"
           value={message}
           onChange={(e) => {setMessage(e.target.value),
            handleTyping()
           }}
           placeholder="Type messages...."
           />

           <button className="bg-green-600 rounded-md px-4 py-2 border border-black" onClick={sendMessage}>Send</button>
        </div>
    )
}