import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))


// routes

server.listen(port,() => {
    console.log(`Server is started at port ${port}`)
})
