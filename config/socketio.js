// import express from "express";
// const app = express();
// import http from "http";
// const server = http.createServer(app);
// // const { Server } = require("socket.io");
// import { Server } from "socket.io";
// const io = new Server(server);

// var clients = {};
// class ConnectSocket {
//   static connectSocket() {
//     console.log("connect socket io called");
//     io.on("connection", (socket) => {
//       console.log("connected");
//       console.log(socket.id, "has joined");
//       socket.on("signin", (id) => {
//         console.log(id);
//         clients[id] = socket;
//       });
//       socket.on("msg", (msg) => {
//         console.log(msg);
//         let targetId = msg.targetId;
//         if (clients[targetId]) clients[targetId] = emit("msg", msg);
//       });
//     });
//   }
// }

// export default ConnectSocket;
