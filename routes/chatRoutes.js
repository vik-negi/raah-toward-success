import { Router } from "express";
import ChatController from "../controllers/chatController.js";
import Auth from "../middleware/auth-middleware.js";
import chatMiddleware from "../middleware/chatMiddleware.js";

const chatRouter = Router();

chatRouter.post(
  "/sendMessage/:senderUserId/:receiverUserId",
  Auth.checkUserAuth,
  chatMiddleware,
  ChatController.createMessage
);
chatRouter.get(
  "/getChat/:senderUserId/:receiverUserId",
  Auth.checkUserAuth,
  chatMiddleware,
  ChatController.getUserChat
);
chatRouter.get(
  "/getAllUser/:senderUserId",
  Auth.checkUserAuth,
  ChatController.getAllUser
);
chatRouter.get(
  "/deleteChat/:chatId",
  Auth.checkUserAuth,
  ChatController.deleteChat
);
chatRouter.post(
  "/functionality/:chatId",
  Auth.checkUserAuth,
  ChatController.functionality
);

export default chatRouter;
