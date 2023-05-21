import { Router } from "express";
import ChatController from "../controllers/chatController.js";
import checkUserAuth from "../middleware/auth-middleware.js";
import chatMiddleware from "../middleware/chatMiddleware.js";

const chatRouter = Router();

chatRouter.post(
  "/sendMessage/:senderUserId/:receiverUserId",
  checkUserAuth,
  chatMiddleware,
  ChatController.createMessage
);
chatRouter.get(
  "/getChat/:senderUserId/:receiverUserId",
  checkUserAuth,
  chatMiddleware,
  ChatController.getUserChat
);
chatRouter.get(
  "/getAllUser/:senderUserId",
  checkUserAuth,
  ChatController.getAllUser
);
chatRouter.get(
  "/deleteChat/:chatId",
  checkUserAuth,
  ChatController.deleteChat
);
chatRouter.post(
  "/functionality/:chatId",
  checkUserAuth,
  ChatController.functionality
);

export default chatRouter;
