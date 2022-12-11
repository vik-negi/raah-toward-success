import express from "express";
import AccountController from "../controllers/accountController.js";
import Auth from "../middleware/auth-middleware.js";

const accountRouter = express.Router();

// ROute Level Middleware - To Protect Route
accountRouter.use("/changepassword", Auth.checkUserAuth);
accountRouter.use("/loggedUserData", Auth.checkUserAuth);

accountRouter.post("/signup", AccountController.signup);

accountRouter.post("/signin", AccountController.sigin);
accountRouter.post("/update-profile", AccountController.updates);
accountRouter.get(
  "/likedposts",
  Auth.checkUserAuth,
  AccountController.likedPosts
);

accountRouter.post(
  "/sendEmailResetLink",
  AccountController.sendUserPasswordResetEmail
);
accountRouter.post(
  "/reset-password/:id/:token",
  AccountController.userPasswordReset
);

//private route => secured by middleware
accountRouter.post("/changepassword", AccountController.changeUserPassword);
accountRouter.get("/loggedUserData", AccountController.loggedUserData);

export default accountRouter;
