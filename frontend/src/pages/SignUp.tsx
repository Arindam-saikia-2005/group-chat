import axios from "axios";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

interface SignUpProps {
  setToken: Dispatch<SetStateAction<string | null>>;
}

export default function SignUp({setToken} : SignUpProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate =  useNavigate()

  const handleOnChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/register`, formData);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setToken(token)
      }
      toast.success("Registration successful!");
      setFormData({ name: "", email: "", password: "" });
      navigate("/")
    } catch (error: any) {
      toast.error("Registration failed");
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <p className="text-white font-semibold text-2xl text-center">SignUp</p>
        <div className="bg-[#202c33] space-y-4 p-8 flex flex-col w-96 border rounded-md border-gray-500  justify-center">
          <input
          className="border border-gray-300 rounded-md py-2"
          type="text"
          name="name"
          value={formData.name}
          placeholder=" Name.."
          onChange={handleOnChage}
          />
          <input
          className="border border-gray-300 rounded-md py-2"
            type="email"
            name="email"
            value={formData.email}
            placeholder=" Email..."
            onChange={handleOnChage}
          />
          <input
          className="border border-gray-300 rounded-md py-2"
            type="password"
            name="password"
            value={formData.password}
            placeholder=" Password..."
            onChange={handleOnChage}
          />
          <button
            className="bg-blue-500 font-semibold text-sm text-white px-3 py-2"
            type="submit"
          >
            SignUp
          </button>
          <p className="text-sm text-center font-semibold">
            Already have an account ?
            <span className="text-blue-600 text-sm"><NavLink to="/login">Login</NavLink></span>
          </p>
        </div>
      </form>
    </div>
  );
}
