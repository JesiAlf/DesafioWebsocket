/*import express, { urlencoded } from "express";
import {engine} from "express-handlebars"
import __dirname from "./utils.js";
import * as path from "path"




/*import  {Server} from "socket.io";
const io = new Server();
io.on("connection", (socket) => {
    console.log("A user connected");
  
    socket.on("message", (message) => {
      console.log(`Message received: ${message}`);
      io.emit("message", message);
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  
  io.listen(3000);*/
const socket= io();
socket.emit("message","comunicacion desde websocket");