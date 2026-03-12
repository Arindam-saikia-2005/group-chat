import { IoIosSearch } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import CreateGroupModal from "./CreateModal";
import axios from "axios";


 interface IGroup  {
   _id:string;
    name:string;
    createdAt:Date;
    updatedAt:Date;
}

export default function Sidebar() {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [groups, setGroups] = useState<IGroup[]>([]);

  const token = localStorage.getItem("token");

  const getAllGroups = async () => {
    await axios
      .get("http://localhost:8000/api/group", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setGroups(res.data));
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  return (
    <div className="w-[350px] bg-[#111b21] flex flex-col border-r border-gray-700">
      {/* header */}

      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <p className="text-white font-semibold">Chats</p>

        <MdGroupAdd
          size={24}
          className="text-gray-300 cursor-pointer hover:text-white"
          onClick={() => setOpenCreateGroup(true)}
        />
      </div>

      {/* search */}

      <div className="p-3">
        <div className="flex items-center gap-3 bg-[#202c33] px-4 py-2 rounded-lg">
          <IoIosSearch className="text-gray-400" />
          <input
            placeholder="Search groups"
            className="bg-transparent outline-none text-white text-sm w-full"
          />
        </div>
      </div>

      {/* group list */}

      <div className="flex-1 overflow-y-auto">
        {/* example group item */}

        {groups.map((g,) => (
          <div key={g._id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#202c33] cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white">
              G
            </div>

            <div className="flex flex-col">
              <p className="text-white text-sm font-medium">{g.name}</p>

              <p className="text-xs text-gray-400">Last message preview...</p>
            </div>
          </div>
        ))}
      </div>

      {openCreateGroup && (
        <CreateGroupModal close={() => setOpenCreateGroup(false)} />
      )}
    </div>
  );
}
