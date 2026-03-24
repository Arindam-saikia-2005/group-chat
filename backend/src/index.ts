import "./config/cloudinary.js";

import express from "express";
import http from "http";
import { Server } from "socket.io"
import { Server as HTTPServer } from "http"
import { authRouter } from "./routes/auth.route.js";
import { userRoute } from "./routes/user.route.js";
import { groupRoute } from "./routes/group.route.js";
import { messageRouter } from "./routes/message.route.js";
import type { clientToServerEvents, serverToClientEvents } from "./socket/types.js";
import { User } from "./model/user.model.js";
import { registerChatHandlers } from "./socket/chat.js";
import { dbConnect } from "./config/db.js";
import jwt from "jsonwebtoken"
import cors from "cors"

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())


export const initilizeSocket = async (server: HTTPServer) => {
  const io = new Server<clientToServerEvents, serverToClientEvents>(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error("unAuthorized");
      const decode = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      const user = await User.findById(decode.id);

      if (!user) throw new Error("user not found")

      socket.data.user = user;
      next();
    } catch (error) {
      next(new Error("UnAuthorized"))
    }
  })

  io.on("connection", async (socket) => {
    const user = socket.data.user;

    await User.findByIdAndUpdate(user._id, {
      isOnline: true
    });

    io.emit("online_users", await getOnelineUsers());

    registerChatHandlers(io, socket)

    socket.on("request_online_users", async () => {
      socket.emit("online_users", await getOnelineUsers());
    });

    socket.on("disconnect", async () => {
      await User.findByIdAndUpdate(user._id, {
        isOnline: false,
        lastSeen: new Date(),
      })
      io.emit("online_users", await getOnelineUsers())
    });

  })

  return io;
}

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);
app.use("/api/group", groupRoute);
app.use("/api/message", messageRouter);

dbConnect()

initilizeSocket(server)

export const getOnelineUsers = async (): Promise<string[]> => {
  const users = await User.find({ isOnline: true })
  return users.map((u) => u._id.toString());
}

server.listen(port, () => {
  console.log(`Server is started at port ${port}`)
})
