import express from "express";
import AccountController from "../controllers/accountController.js";
import checkUserAuth from "../middleware/auth-middleware.js";

const accountRouter = express.Router();

// ROute Level Middleware - To Protect Route
accountRouter.use("/changepassword", checkUserAuth);

accountRouter.post("/signup", AccountController.signup);

accountRouter.post("/signin", AccountController.sigin);
accountRouter.post("/add-skill-socialMedia", checkUserAuth, AccountController.addSkillAndSocialMedia);
accountRouter.post("/remove-skill-socialMedia", checkUserAuth, AccountController.removeSkillAndSocialMedia);
accountRouter.post("/update-profile", checkUserAuth, AccountController.updates);
accountRouter.get("/likedposts", checkUserAuth, AccountController.likedPosts);

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

accountRouter.use("/", checkUserAuth, AccountController.loggedUserData);
export default accountRouter;
