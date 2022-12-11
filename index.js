import express from "express";
import connectDB from "./config/connectDb.js";
import bodyParser from "body-parser";
import accountRoutes from "./routes/accountRoutes.js";
import cors from "cors";
import postRouter from "./routes/postRoutes.js";
// import { DATABASE_URL, PORT } from "./constants.js";
import dotenv from "dotenv";
import { multerUploads } from "./utils/multer.js";
import PostController from "./controllers/postController.js";
import chatRouter from "./routes/chatRoutes.js";
import testRouter from "./routes/test.js";
import cookieParser from "cookie-parser";
// import { isUserAuth } from "./middleware/auth-middleware.js";
import Auth from "./middleware/auth-middleware.js";
// import SocketIO from "./app.js";
const app = express();

dotenv.config();

// Database connec
var USERNAME = process.env.USERNAME;
var PASSWORD = process.env.PASSWORD;
connectDB(USERNAME, PASSWORD);

app.use(cors());
// JSON
// app.use(express.json());
const port = process.env.PORT || 8000;

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

// app.get("/home", (req, res) => {
//   return res.render("index");
// });
app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.use("/user/create-post", cpUpload, PostController.createPost);
app.use("/account", accountRoutes);
app.use("/user", postRouter);

app.use("/api/user/chat", chatRouter);

app.use("/test", testRouter);
app.use("/", Auth.isUserAuth);
app.listen(8000, "0.0.0.0", () => {
  console.log(`server is running at http://locathost:${port}`);
});
