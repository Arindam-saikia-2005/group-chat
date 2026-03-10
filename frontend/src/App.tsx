import { useEffect } from "react";
import { connectSocket } from "./socket/socket";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";



export default function Page() {
  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token) {
      connectSocket(token!)
    }
  },[])
  return (
    <>
      <div className="w-[20%] h-screen border-r border-gray-100">
          <Sidebar/>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}