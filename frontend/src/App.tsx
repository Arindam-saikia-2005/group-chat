import { useEffect } from "react";
import { connectSocket } from "./socket/socket";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import axios from "axios";
import ChatLayout from "./pages/ChatLayout";
import { Toaster } from "react-hot-toast";

export default function Page() {
  const token = localStorage.getItem("token");

  async function getLoggedInUser() {
    await axios.get("http://localhost:8000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  useEffect(() => {
    if (token) {
      getLoggedInUser();
      connectSocket(token!);
    }
  }, [token]);
  return (
    <>
    <Toaster/>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              index
              element={token ? <ChatLayout /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={!token ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
