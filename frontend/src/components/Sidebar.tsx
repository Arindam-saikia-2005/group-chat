import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface IUser {
  id:string
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  isOnline: boolean;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function Sidebar() {
  const [users, setUsers] = useState<IUser[]>([]);

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data)
    setUsers(res.data.users);
    return res.data.users;
  };

  useEffect(() => {
    getAllUsers();
  });

  return (
    <div className="h-full w-[30%] space-y-3 ">

      {/*------- Search-bar------ */}
    
      <div className="flex h-auto w-[250px] justify-center bg-[#2d2e2e] rounded-md">
        <div className="flex px-5 py-3 space-x-3">
          <span><IoIosSearch size={20}/></span>
          <p className="text-gray-50 text-sm">Search or start a new chat</p>
        </div>
      </div>

 

     {
      users.map((u) => (
        <div className="flex" key={u.id}>
            <p className="rounded-[50%] text-white">{u.profilePic}</p>
           <p className="text-sm font-semibold">{u.name}</p>
        </div>
      ))
     }
    </div>
  );
}
