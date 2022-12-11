// const express = require("express");
import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
// var http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");
const io = new Server(server);

var clients = {};

class SocketIO {
  static connectSocketIo = () => {
    io.on("connection", (socket) => {
      console.log("connected");
      console.log(socket.id, "has joined");
      socket.on("signin", (id) => {
        console.log(` id = ${id}`);
        clients[id] = socket;
      });
      socket.on("msg", (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
        console.log(`targetId =  ${targetId}`);
        console.log(`clients[targetId] = ${clients[targetId]}`);
        if (clients[targetId]) {
          clients[targetId] = emit("msg", msg);
        } else {
          console.log("user not found");
          emit("msg", "user not found");
        }
      });
    });
  };
}

export default SocketIO;
