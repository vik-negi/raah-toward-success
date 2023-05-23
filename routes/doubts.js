import { Router } from "express";
import PostController from "../controllers/postController.js";
import ChatController from "../controllers/chatController.js";
import checkUserAuth from "../middleware/auth-middleware.js";

const doubtRouter = Router();
doubtRouter.get("/get-doubts", checkUserAuth, PostController.getDoubts);
doubtRouter.post("/create-doubts", checkUserAuth, ChatController.createDoubt);

export default doubtRouter;
