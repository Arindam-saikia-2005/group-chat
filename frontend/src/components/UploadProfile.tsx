import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface Props {
  close: () => void;
}

export default function UploadProfile({ close }: Props) {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const handleUploadImg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/update-profile`,
        { profilePic, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully");
      close(); 
    } catch (err: any) {
      console.error(err.message);
      toast.error("Upload failed!");
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfilePic(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      {/* modal */}
      <div className="bg-[#202c33] text-white w-87.5 rounded-2xl shadow-lg p-6 relative space-y-4">

        {/* close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <IoClose size={22} />
        </button>

        {/* title */}
        <h2 className="text-lg font-semibold text-center">
          Edit Profile
        </h2>

        {/* preview */}
        <div className="flex justify-center">
          <img
            src={profilePic || "/default-img.jpg"}
            alt="preview"
            className="h-20 w-20 rounded-full object-cover border border-gray-600"
          />
        </div>

        {/* form */}
        <form onSubmit={handleUploadImg} className="space-y-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            className="w-full text-sm file:bg-gray-700 file:border-none file:px-3 file:py-1 file:rounded file:text-white cursor-pointer"
          />

          <input
            type="text"
            placeholder="Enter new name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#111b21] outline-none border border-gray-600"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition py-2 rounded text-sm font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}