import { Router } from "express";
import PostController from "../controllers/postController.js";
import checkUserAuth from "../middleware/auth-middleware.js";
const postRouter = Router();
postRouter.post("/create-post", checkUserAuth, PostController.createPost);
postRouter.get("/create-post", (req, res) => {
  res.send({ status: "failed", message: "Method not allowed" });
});
postRouter.get("/get-all-posts", PostController.getAllPosts);
postRouter.get(
  "/get-doubts",
  checkUserAuth,
  PostController.getDoubts
);
// postRouter.get("/get-post/:id", PostController.getPost);
postRouter.post(
  "/like-post/:id",
  checkUserAuth,
  PostController.likeAndUnlikePost
);
postRouter.post(
  "/post-comment/:postId",
  checkUserAuth,
  PostController.addComment
);

export default postRouter;
