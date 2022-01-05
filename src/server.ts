import express, {Request, Response} from "express";
import dotenv from "dotenv";
import {router} from "./router/router" 

dotenv.config();

const server = express();

server.use(express.json());
server.use(router)

server.use("/ping",(req:Request, res:Response)=>{
    res.status(200).json({message: "pong"})
})

server.use((req:Request, res:Response)=>{
    res.status(404).json({message: "Endpoint not found"});
})

server.listen(process.env.PORT)