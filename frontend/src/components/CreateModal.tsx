import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  close: () => void;
}

interface IUser {
  _id: string;
  name: string;
}

export default function CreateGroupModal({ close }: Props) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const token = localStorage.getItem("token");

  const createGroup = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/group/create",
        { name, members: selectedMembers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      close();
    } catch (err) {
      console.error("Group creation failed", err);
    }
  };

  const allUsers = async () => {
    await axios
      .get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data.users));
  };

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-[#202c33] w-100 rounded-lg p-5">
        <h2 className="text-white text-lg mb-4">Create New Group</h2>

        <input
          placeholder="Group name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-[#2a3942] text-white outline-none"
        />

        <div className="max-h-60 overflow-y-auto mt-3">
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => toggleMember(u._id)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#2a3942] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedMembers.includes(u._id)}
                readOnly
              />

              <p className="text-white text-sm">{u.name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={createGroup}
          className="bg-green-600 px-4 py-2 mt-4 rounded text-white"
        >
          Add Members
        </button>

        <button className="ml-3 text-gray-400" onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );
}
