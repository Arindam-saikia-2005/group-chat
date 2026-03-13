import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";

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
  const [Dp, setDp] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const createGroup = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/group/create",
        { name, members: selectedMembers, groupDp: Dp },
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDp(reader.result);
      }
    };

    reader.readAsDataURL(file);
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

        <div className="flex flex-col items-center mt-4">
          <div className="w-20 h-20 rounded-full bg-[#2a3942] flex items-center justify-center overflow-hidden">
            {Dp ? (
              <img src={Dp} className="w-full h-full object-cover" />
            ) : (
               <FiCamera className="text-gray-400" size={20} />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-sm text-gray-300 border border-black rounded-md p-3"
          />
        </div>

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
