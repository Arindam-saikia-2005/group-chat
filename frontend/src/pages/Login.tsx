import axios from "axios";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate} from "react-router-dom";

interface LoginProps {
  setToken: Dispatch<SetStateAction<string | null>>;
}

export default function Login({setToken}:LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate =  useNavigate()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/login`, formData);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setToken(token)
      }

      setFormData({ email: "", password: "" });
      toast.success("login successful");
      navigate("/")
    } catch (error: any) {
      console.error(error.message);
      toast.error("login failed");
    }
  };

  return (
    <div className="mx-auto  h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <p className="text-white font-semibold text-2xl text-center">Login</p>
        <div className="bg-[#202c33] space-y-4 p-8 flex flex-col w-96 border rounded-md border-gray-500">
          <input 
             className="border border-gray-300 rounded-md py-2"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder=" email..."
          />
          <input
            className="border border-gray-300 rounded-md py-2"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder=" password..."
          />
        <button className="text-sm px-4 py-2 bg-blue-400 rounded-md" type="submit">Login</button>
        </div>
        <p className="text-gray-400 font-semibold text-sm px-4 py-3 text-center">Don't have an account ? <span className="text-sm text-blue-600"><NavLink to="/register">register</NavLink></span></p>
      </form>
    </div>
  );
}
