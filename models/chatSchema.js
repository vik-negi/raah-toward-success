import Mongoose from "mongoose";

const chatSchema = new Mongoose.Schema(
  {
    isSent: {
      type: Boolean,
      required: true,
      default: true,
    },
    receiverUserId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    senderUserId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    sendBy: {
      type: String,
      required: true,
    },
    recieveBy: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPinned: {
      type: Boolean,
      required: true,
      default: false,
    },
    isForwarded: {
      type: Boolean,
      required: true,
      default: false,
    },
    reaction: {
      type: String,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    isReceived: {
      type: Boolean,
      required: true,
      default: false,
    },
    messageType: {
      type: String,
      required: true,
      default: "text",
    },
  },
  { Timestamp: true }
);

const Chat = Mongoose.model("chat", chatSchema);
export default Chat;
