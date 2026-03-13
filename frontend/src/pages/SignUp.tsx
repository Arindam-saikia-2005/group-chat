import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", formData);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      toast.success("Registration successful!");
      setFormData({ name: "", email: "", password: "" });
    } catch (error: any) {
      toast.error("Registration failed");
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleOnChage}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email..."
            onChange={handleOnChage}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password..."
            onChange={handleOnChage}
          />
          <button
            className="bg-blue-500 font-semibold text-sm text-white px-3 py-2"
            type="submit"
          >
            SignUp
          </button>
          <p className="text-sm ">
            Already have an account ?{" "}
            <span className="text-blue-600 text-sm">Login</span>
          </p>
        </div>
      </form>
    </div>
  );
}
