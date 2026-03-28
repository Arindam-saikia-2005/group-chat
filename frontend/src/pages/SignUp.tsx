import axios from "axios";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";

interface SignUpProps {
  setToken: Dispatch<SetStateAction<string | null>>;
}

export default function SignUp({ setToken }: SignUpProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/register`,
        formData,
      );
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
      }
      toast.success("Registration successful!");
      setFormData({ name: "", email: "", password: "" });
      navigate("/");
    } catch (error: any) {
      toast.error("Registration failed");
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto bg-[#0F0F0F] h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="bg-[#181818] space-y-4 p-8 flex flex-col w-96 border rounded-md border-gray-500  justify-center">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUserLarge />
            </span>

            <input
              className="w-full pl-10 border font-semibold text-sm bg-[#111111] border-gray-300 rounded-md py-2"
              type="text"
              name="name"
              value={formData.name}
              placeholder=" Name.."
              onChange={handleOnChage}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineEmail />
            </span>
            <input
              className="w-full pl-10 border font-semibold text-sm bg-[#111111] border-gray-300 rounded-md py-2"
              type="email"
              name="email"
              value={formData.email}
              placeholder=" Email..."
              onChange={handleOnChage}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IoLockClosedOutline />
            </span>

            <input
              className="w-full pl-10 border font-semibold text-sm bg-[#111111] border-gray-300 rounded-md py-2"
              type="password"
              name="password"
              value={formData.password}
              placeholder=" Password..."
              onChange={handleOnChage}
            />
          </div>
          <button
            className="bg-[#0174dc] rounded-md font-semibold text-sm text-white px-3 py-2"
            type="submit"
          >
            SignUp
          </button>
          <p className="text-sm text-center font-semibold">
            Already have an account ?
            <span className="text-blue-600 text-sm">
              <NavLink to="/login">Login</NavLink>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
