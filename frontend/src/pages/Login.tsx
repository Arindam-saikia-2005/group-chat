import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, redirect } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", formData);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      setFormData({ email: "", password: "" });
      toast.success("login successful");
      redirect("/")
    } catch (error: any) {
      console.error(error.message);
      toast.error("login failed");
    }
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Enter your email..."
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Enter your password..."
          />
        </div>
        <button type="submit">Login</button>
        <p className="text-blue-600 text-sm px-4 py-3">Don't have an account ? <span className="text-sm text-blue-600"><NavLink to="/register">register</NavLink></span></p>
      </form>
    </div>
  );
}
