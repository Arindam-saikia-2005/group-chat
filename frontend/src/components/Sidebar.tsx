import { IoIosSearch } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { useState } from "react";
import CreateGroupModal from "./CreateModal";
import GroupItem from "./GroupItem";
import {useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

export default function Sidebar({
  selectedGroup,
}: {
  selectedGroup: (group: any) => void;
}) {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const navigate = useNavigate()

  function logout() {
  localStorage.clear();
  navigate("/login", { replace: true });
}

  return (
    <div className="w-87.5 bg-[#111b21] flex flex-col border-r border-gray-700">
      {/* header */}

      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <p className="text-white font-semibold">Chats</p>
        <div className="flex space-x-3">
          <IoExitOutline
            size={24}
            className="text-gray-300 cursor-pointer hover:text-white"
            onClick={logout}
          />
          <MdGroupAdd
            size={24}
            className="text-gray-300 cursor-pointer hover:text-white"
            onClick={() => setOpenCreateGroup(true)}
          />
        </div>
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

      <div className="flex-1 overflow-y-auto">
        <GroupItem selectedGroup={selectedGroup} />
      </div>

      {openCreateGroup && (
        <CreateGroupModal close={() => setOpenCreateGroup(false)} />
      )}
    </div>
  );
}
