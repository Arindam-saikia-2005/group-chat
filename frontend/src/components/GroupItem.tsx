import { useEffect, useState } from "react";
import axios from "axios";

interface IGroup {
  _id: string;
  name: string;
  groupDp:string;
  createdAt: Date;
  updatedAt: Date;
}

export default function GroupItem({ selectedGroup } : {selectedGroup :(group: any) => void}) {
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
    <div>
      {groups.map((g) => (
        <div
          key={g._id}
          onClick={()=>selectedGroup(g)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#202c33] cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white">
            <img
            className="h-auto w-auto object-cover" 
            src={g.groupDp} />
          </div>

          <div className="flex flex-col">
            <p className="text-white text-sm font-medium">{g.name}</p>

            <p className="text-xs text-gray-400">Last message preview...</p>
          </div>
        </div>
      ))}
    </div>
  );
}
