import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UploadProfile() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const token = localStorage.getItem("token")

  const handleUplodImg = async(e:React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();
       await axios.post("http://localhost:8000/api/user/profile-pic",{profilePic},{
        headers:{
          Authorization:`Bearer ${token}`
        }
       });
        setProfilePic(null);
        toast.success("image upload successfully")
    } catch (err: any) {
      console.error(err.message);
      toast.error("uploading failed!")
    }
  };

  const handleImgChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: string,
  ) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          if (state === "profilePic") {
            setProfilePic(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-gray-400 h-auto w-auto p-5 space-y-3">
      <form onSubmit={handleUplodImg}>
        <input
         className="border border-black rounded-md"
          type="file"
          accept="image/*"
          onChange={(e) => handleImgChange(e, "profilePic")}
        />
        <button className="bg-blue-500 px-5 py-2 text-white text-sm rounded-md" type="submit">upload</button>
      </form>

      {profilePic && <img src={profilePic} width={120} />}
    </div>
  );
}
