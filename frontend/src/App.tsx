import { useEffect } from "react";
import { connectSocket } from "./socket/socket";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";


export default function Page() {
  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token) {
      connectSocket(token!)
    }
  },[])
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}