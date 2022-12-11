import { Router } from "express";
import PostController from "../controllers/postController.js";
import Auth from "../middleware/auth-middleware.js";
const postRouter = Router();
postRouter.post("/create-post", Auth.checkUserAuth, PostController.createPost);
postRouter.get("/create-post", (req, res) => {
  res.send({ status: "failed", message: "Method not allowed" });
});
postRouter.get("/get-all-posts", PostController.getAllPosts);
postRouter.get(
  "/get-comments/:postId",
  Auth.checkUserAuth,
  PostController.getComments
);
// postRouter.get("/get-post/:id", PostController.getPost);
postRouter.post(
  "/like-post/:id",
  Auth.checkUserAuth,
  PostController.likeAndUnlikePost
);
postRouter.post(
  "/post-comment/:postId",
  Auth.checkUserAuth,
  PostController.addComment
);

export default postRouter;
