import { Router } from "express";
import PostController from "../controllers/postController.js";
import checkUserAuth from "../middleware/auth-middleware.js";

const doubtRouter = Router();
doubtRouter.get(
    "/get-doubts",
    checkUserAuth,
    PostController.getDoubts
);

export default doubtRouter;