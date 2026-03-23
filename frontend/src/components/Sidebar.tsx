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

interface IGroup {
  _id: string;
  name: string;
  groupDp:string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUser {
  profilePic: string;
}

interface PropsType {
  selectedGroup: (group: any) => void;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Sidebar({ selectedGroup, setToken }: PropsType) {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [search, setSearch] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState<IUser | null>();
  const[loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  async function getUser() {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data));
    } catch (err) {
      toast.error("getting user failed!");
    }
  }

  const getAllGroups = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/group`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setGroups(res.data));
    } catch (err:any) {
     console.error(err.message);
    } finally {
    setLoading(false)
    }
  };

  function logout() {
    localStorage.clear();
    setToken(null);
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    getUser();
    getAllGroups();
  }, []);


  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase()),
  );

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search groups"
            className="bg-transparent outline-none text-white text-sm w-full"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <GroupItem loading={loading} selectedGroup={selectedGroup} groups={filteredGroups} />
      </div>

      {openCreateGroup && (
        <CreateGroupModal close={() => setOpenCreateGroup(false)} />
      )}
      {openProfile && <UploadProfile close={() => setOpenProfile(false)} />}
    </div>
  );
}
