import express from "express";
import connectDB from "./config/connectDb.js";
import bodyParser from "body-parser";
import accountRoutes from "./routes/accountRoutes.js";
import resourceRouter from './routes/resources.js';
import cors from "cors";
import postRouter from "./routes/postRoutes.js";
// import { DATABASE_URL, PORT } from "./constants.js";
import dotenv from "dotenv";
import { multerUploads } from "./utils/multer.js";
import PostController from "./controllers/postController.js";
import doubtRouter from "./routes/doubts.js";
import chatController from "./controllers/chatController.js";

import cookieParser from "cookie-parser";
// import SocketIO from "./app.js";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = express();

dotenv.config();

// Database connec
var USERNAME = process.env.MONGODBUSERNAME;
var PASSWORD = process.env.PASSWORD;

connectDB(USERNAME, PASSWORD);

app.use(cors());
// JSON
// app.use(express.json());
const port = process.env.PORT || 5000;

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
// JSON
app.use(express.json());
app.use(express.static("public"));
//below are dynamic pages
app.set("view engine", "ejs");

// SocketIO.connectSocketIo(io, clients);

let cpUpload = multerUploads.fields([{ name: "image", maxCount: 1 }]);

// socket io
// import { Server } from "socket.io";

// const httpServer =
app.listen(port, "0.0.0.0", () => {
  console.log(`server is running at http://localhost:${port}`);
});

// var io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });
// const client = new Map();
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("join", (room) => {
//     console.log("joined room", room);
//     socket.join(room);
//   });
//   socket.on("signin", (id) => {
//     // console.log(socket.id, "has signin");
//     console.log(id, "id has signin");
//     socket.user = {
//       id: id,
//     };
//     client.set(id, socket);
//   });
//   socket.on("message", async (message) => {
//     var returnData = await chatController.createMessage(message);

//     await socket.emit("message", returnData);

//     // io.to(message.room).emit("message", message);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     if (socket.user) {
//       client.delete(socket.user.id);
//     }
//   });
// });

app.use("/user/create-post", cpUpload, PostController.createPost);
app.use("/account/auth", accountRoutes);
app.use("/user", postRouter);
app.use("/resource", resourceRouter);

app.use("/doubt", doubtRouter);

app.use("/", (req, res) => {
  return res.status(200).json({
    "status": "success",
  })
});
