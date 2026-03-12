export default function ChatWindow() {
  return (
    <div className="flex flex-col flex-1">

      {/* chat header */}

      <div className="flex items-center gap-3 px-5 py-3 bg-[#202c33] border-b border-gray-700">
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="text-white font-semibold">John Doe</p>
          <p className="text-xs text-gray-400">Online</p>
        </div>
      </div>

      {/* messages */}

      <div className="flex-1 p-5 overflow-y-auto bg-[#0b141a] space-y-3">

        {/* received message */}

        <div className="bg-[#202c33] w-fit px-4 py-2 rounded-lg text-white text-sm">
          Hello 👋
        </div>

        {/* sent message */}

        <div className="bg-[#005c4b] w-fit px-4 py-2 rounded-lg text-white text-sm ml-auto">
          Hi! How are you?
        </div>

      </div>

      {/* message input */}

      <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33]">

        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 bg-[#2a3942] text-white px-4 py-2 rounded-lg outline-none"
        />

        <button className="bg-[#00a884] px-4 py-2 rounded-lg text-white">
          Send
        </button>

      </div>

    </div>
  );
}