import axios from "axios";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";

interface LoginProps {
  setToken: Dispatch<SetStateAction<string | null>>;
}

export default function Login({ setToken }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/login`,
        formData,
      );
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
      }

      setFormData({ email: "", password: "" });
      toast.success("login successful");
      navigate("/");
    } catch (error: any) {
      console.error(error.message);
      toast.error("login failed");
    }
  };

  return (
    <div className="mx-auto bg-[#0F0F0F]  h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="bg-[#181818] space-y-4 p-8 flex flex-col w-96 border rounded-md border-gray-500">
          <p className="text-center font-semibold text-2xl">Welcome back</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineEmail />
            </span>

            <input
              className="w-full pl-10 border font-semibold text-sm bg-[#111111] border-gray-300 rounded-md py-2"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Email..."
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
             <IoLockClosedOutline/>
            </span>
            <input
              className="w-full pl-10 border font-semibold text-sm bg-[#111111] border-gray-300 rounded-md py-2"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder=" Password..."
            />
          </div>
          <button
            className="text-sm px-4 py-2 bg-[#0174dc] rounded-md"
            type="submit"
          >
            Login
          </button>
        </div>
        <p className="text-gray-400 font-semibold text-sm px-4 py-3 text-center">
          Don't have an account ?{" "}
          <span className="text-sm text-blue-600">
            <NavLink to="/register">register</NavLink>
          </span>
        </p>
      </form>
    </div>
  );
}
