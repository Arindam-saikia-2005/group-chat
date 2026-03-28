import {io,Socket} from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "../types/socket.types";


const URL = `${import.meta.env.VITE_SOCKET_URL}`
export const socket:Socket<ServerToClientEvents,ClientToServerEvents>= io(URL,{
    autoConnect:false,
    withCredentials:true,
});

export const connectSocket = (token:string) => {
  socket.auth = {token};
  socket.connect()
}