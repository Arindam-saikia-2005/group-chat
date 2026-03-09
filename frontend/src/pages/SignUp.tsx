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
    setFormData({ ...formData, [e.target.value]: e.target.name });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/user/register", formData);
      toast.success("Form submitted successfully!");
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
            value={FormData.name}
            onChange={handleOnChage}
            placeholder="Enter your name..."
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
