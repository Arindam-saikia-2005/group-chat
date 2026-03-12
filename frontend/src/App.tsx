import { useEffect } from "react";
import { connectSocket } from "./socket/socket";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import axios from "axios";
import ChatLayout from "./pages/ChatLayout";

export default function Page() {
  const token = localStorage.getItem("token");
  async function getLoggedInUser() {
    await axios.get("http://localhost:8000/api/auth/me",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
  }

  if(!token) {
    redirect("/login")
  }

  useEffect(() => {
    getLoggedInUser()
    if (token) {
      connectSocket(token!);
    }
  }, []);
  return (
    <>
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={token ? <ChatLayout/> : ""} />
          <Route path="/register" element={!token ?<SignUp /> : ""} />
          <Route path="/login" element={!token ? <Login />: ""} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}
