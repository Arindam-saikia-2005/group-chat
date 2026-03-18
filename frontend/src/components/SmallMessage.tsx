import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import type { IGroup } from "./ChatWindow";
import { useState } from "react";

export default function SmallMessage({
  group,
  setOpenModel,
  setGroup,
}: {
  group: IGroup | null;
  setOpenModel: (val: boolean) => void;
  setGroup: React.Dispatch<React.SetStateAction<IGroup | null>>;
}) {
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  async function promoteAdmin(userId: string) {
    if (!group?._id) return;
    setLoadingUserId(userId);
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/group/${group?._id}/promote-admin`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGroup(res.data.group);
      toast.success("user promoted successfully!");
    } catch (err: any) {
      console.error(err.message);
      toast.error("Failed to promote user");
    } finally {
      setLoadingUserId(null);
    }
  }

  async function demoteAdmin(userId: string) {
    if (!group?._id) return;
    setLoadingUserId(userId);
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/group/${group?._id}/demote-admin`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGroup(res.data.group);

      toast.success("user demoted  successfully!");
    } catch (err: any) {
      console.error(err.message);
      toast.error("Failed to demote user");
    } finally {
      setLoadingUserId(null);
    }
  }

  async function removeAnUser(userId: string) {
    if (!group?._id) return;
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/group/${group?._id}/members/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGroup(res.data.group);
      toast.success("Member removed successfully!");
    } catch (err: any) {
      console.error(err.message);
      toast.error("Failed to remove the user");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 🔹 Background Blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setOpenModel(false)}
      />

      {/* 🔹 Modal */}
      <div className="relative bg-[#1f2937] text-white w-[350px] max-h-[300px] rounded-xl shadow-lg p-4 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-md font-semibold">Members</h2>
          <IoMdClose
            size={18}
            className="cursor-pointer hover:text-gray-400"
            onClick={() => setOpenModel(false)}
          />
        </div>

        {/* Members */}
        <div className="space-y-2 overflow-y-auto max-h-[220px] custom-scroll">
          {group?.members.map((m) => {
            const isAdmin =
              group.admins.some((admin: any) => admin._id === m._id) ||
              group.createdBy === m._id;

              const isOwner =  group.createdBy === m._id;

            return (
              <div
                key={m._id}
                className="flex justify-between items-center bg-[#374151] px-3 py-2 rounded-lg hover:bg-[#4b5563] transition"
              >
                {/* Left */}
                <div className="flex items-center gap-2">
                  <img
                    src={m.profilePic || "./default-img.jpg"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-sm">{m.name}</p>
                  {isAdmin && (
                    <span className="text-[9px] bg-yellow-500 text-black px-1 ml-1 rounded">
                      Admin
                    </span>
                  )}
                </div>

                {/* Right */}
                <div className="flex gap-1">
                  {isOwner ? (
                    <span className="text-[10px] bg-purple-600 px-2 py-[2px] rounded">
                      Owner
                    </span>
                  ) : isAdmin ? (
                    <button
                      onClick={() => demoteAdmin(m._id)}
                      disabled={loadingUserId === m._id}
                      className="text-[10px] bg-yellow-500 text-black px-2 py-[2px] rounded disabled:opacity-50"
                    >
                      {loadingUserId === m._id ? "..." : "Demote"}
                    </button>
                  ) : (
                    <button
                      onClick={() => promoteAdmin(m._id)}
                      disabled={loadingUserId === m._id}
                      className="text-[10px] bg-blue-600 px-2 py-[2px] rounded disabled:opacity-50"
                    >
                      {loadingUserId === m._id ? "..." : "Promote"}
                    </button>
                  )}

                  {!isOwner && (
                    <button
                      onClick={() => removeAnUser(m._id)}
                      disabled={loadingUserId === m._id}
                      className="text-[10px] bg-red-600 px-2 py-[2px] rounded disabled:opacity-50"
                    >
                      {loadingUserId === m._id ? "..." : "Remove"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
