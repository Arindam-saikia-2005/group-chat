import { IoIosSearch } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import CreateGroupModal from "./CreateModal";
import GroupItem from "./GroupItem";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import UploadProfile from "./UploadProfile";

interface IUser {
  profilePic: string;
}

interface PropsType {
  selectedGroup: (group: any) => void;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Sidebar({ selectedGroup, setToken }: PropsType) {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState<IUser | null>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function getUser() {
    try {
      await axios
        .get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data));
    } catch (err) {
      toast.error("getting user failed!");
    }
  }

  function logout() {
    localStorage.clear();
    setToken(null);
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-87.5 bg-[#111b21] flex flex-col border-r border-gray-700">
      {/* header */}

      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div
          className="rounded-full cursor-pointer"
          onClick={() => setOpenProfile(true)}
        >
          <img
            className="rounded-full h-10 w-10 object-cover"
            src={user?.profilePic || "/default-img.jpg"}
            alt="profilePic"
          />
        </div>
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
      {openProfile && <UploadProfile close={() => setOpenProfile(false)} />}
    </div>
  );
}
