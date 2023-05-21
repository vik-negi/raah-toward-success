import UserModel from "../models/userSchema.js";
import ChatModel from "../models/chatSchema.js";
import Comment from "../models/commentSchema.js";

class ChatController {
  static getUserChat = async (req, res) => {
    try {
      const { receiverUserId, senderUserId } = req.params;
      const senderChats = await ChatModel.find({
        senderUserId: senderUserId,
        receiverUserId: receiverUserId,
      });
      const receiverChats = await ChatModel.find({
        senderUserId: receiverUserId,
        receiverUserId: senderUserId,
      });
      if (!senderChats && !receiverChats) {
        return res.status(404).json({
          status: "failed",
          message: "No chats found",
        });
      }
      const chats = [...senderChats, ...receiverChats];
      chats.sort(function (a, b) {
        return Number(a.timestamp) - Number(b.timestamp);
      });
      res.status(200).json({
        status: "success",
        data: chats,
        message: "Chats found",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static createMessage = async (data) => {
    try {
      const { userId, message, messageType } = data;
      console.log("data of create message : ", data);

      if (!message) {
        return res.json({
          status: "failed",
          message: "Please provide all the fields",
        });
      }
      const user = await UserModel.findById(userId);
      var comment = new Comment({
        user: userId,
        timestamp: Date.now(),
        isEdited: false,
        text: message,
        image: [],
        replies: [],
        likes: []
      });
      var commLast = await Comment.findOne({
        userId: userId,
        $orderby: { $natural: -1 }
      })
      await comment.save();
      return {
        status: "success",
        data: commLast,
        message: "Message sent",
      };
    } catch (err) {
      console.log("err", err);
      return {
        status: "failed",
        message: err.message,
      };
    }
  };


  static createMessage = async (req, res) => {
    try {
      console.log("req.body", req.body);
      const { receiverUserId, senderUserId } = req.params;
      const { message, messageType } = req.body;

      if (!message) {
        return res.status(400).json({
          status: "failed",
          message: "Please provide all the fields",
        });
      }
      const recieverUser = await UserModel.findById(receiverUserId);
      const recieveBy = recieverUser.username;

      const newMessage = new ChatModel({
        receiverUserId: receiverUserId,
        senderUserId: senderUserId,
        message: message,
        sendBy: req.user.username,
        recieveBy: recieveBy,
      });
      if (messageType) {
        newMessage.messageType = messageType;
      }
      const msg = await newMessage.save();

      res.status(200).json({
        status: "success",
        data: msg,
        message: "Message sent",
      });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({
        status: "failed",
        message: err.message,
      });
    }
  };

  static getAllUser = async (req, res) => {
    try {
      const { senderUserId } = req.params;
      if (!senderUserId) {
        return res.status(404).json({
          status: "failed",
          message: "Invalid user",
        });
      }
      console.log("senderUserId", senderUserId);
      const chatsSender = await ChatModel.where({
        senderUserId: senderUserId,
      }).distinct("receiverUserId");

      const chatsReceived = await ChatModel.where({
        receiverUserId: senderUserId,
      }).distinct("senderUserId");

      if (!chatsSender && !chatsReceived) {
        return res.status(200).json({
          status: "failed",
          message: "No chats found",
          data: [],
        });
      }
      const chats = [...chatsSender];
      for (let i = 0; i < chatsSender.length; i++) {
        if (!chats[i].senderUserId == chatsSender[i].receiverUserId) {
          chats.push(chatsSender[i]);
        }
      }
      console.log(chats);
      var allUser = [];
      // chats.forEach(async (chat) => {
      for (let i = 0; i < chats.length; i++) {
        console.log("chat", chats[i]);
        const id = chats[i];
        const user = await UserModel.findById(id);
        console.log("id", id);

        var lastMessage;
        lastMessage = await ChatModel.find({
          $or: [
            {
              senderUserId: senderUserId,
              receiverUserId: id,
            },
            {
              senderUserId: id,
              receiverUserId: senderUserId,
            },
          ],
        });

        console.log("lastMessage", lastMessage);
        // console.log("user", user);
        // const usersChatScreen =
        allUser.push({
          receiverId: id,
          username: user.username,
          profilePic: user.profileImage.url,
          lastMessage: lastMessage[lastMessage.length - 1].message,
          lastMessageTime: lastMessage[lastMessage.length - 1].timestamp,
          lastMessageBy: lastMessage[lastMessage.length - 1].sendBy,
          name: user.name,
        });

        // allUser.push(usersChatScreen);
      }
      // const receivers = new Set(chats);
      // const receiversData = UserModel.find({})
      // console.log(`receivers`, receivers);
      // console.log(receiverList);
      // receivers.forEach(function (value) {
      //   console.log(`receivers : ${value}`);
      //   allUser.push(value);
      // });
      console.log(allUser);
      return res.status(200).json({
        status: "success",
        data: allUser,
        message: "Chats found",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static deleteChat = async (req, res) => {
    try {
      const { chatId } = req.params;
      console.log("chatId : ", chatId);
      const chat = await ChatModel.findById(chatId);
      if (!chat) {
        return res.status(404).json({
          status: "failed",
          message: "No chat found",
        });
      }
      await chat.remove();
      res.status(200).json({
        status: "success",
        message: "Chat deleted",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static deleteAllChat = async (req, res) => {
    try {
      const { senderUserId, receiverUserId } = req.params;
      console.log("senderUserId : ", senderUserId);
      console.log("receiverUserId : ", receiverUserId);
      const chats = await ChatModel.find({
        $or: [
          {
            senderUserId: senderUserId,
            receiverUserId: receiverUserId,
          },
          {
            senderUserId: receiverUserId,
            receiverUserId: senderUserId,
          },
        ],
      });
      if (!chats) {
        return res.status(404).json({
          status: "failed",
          message: "No chat found",
        });
      }
      chats.forEach(async (chat) => {
        await chat.remove();
      });
      res.status(200).json({
        status: "success",
        message: "Chat deleted",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static functionality = async (req, res) => {
    try {
      const { isPinned, isForwarded, reaction, isReceived, isDeleted, isRead } =
        req.body;
      const { chatId } = req.params;
      const chat = await ChatModel.findById(chatId);
      if (!chat) {
        return res.status(404).json({
          status: "failed",
          message: "No chat found",
        });
      }
      var select;
      if (isPinned) {
        select = "isPinned";
        chat.isPinned = isPinned == "true" ? true : false;
      } else if (isForwarded) {
        select = "isForwarded";
        chat.isForwarded = isForwarded == "true" ? true : false;
      } else if (reaction) {
        select = "reaction";
        chat.reaction = reaction;
      } else if (isReceived) {
        select = "isReceived";
        chat.isReceived = isReceived == "true" ? true : false;
      } else if (isRead) {
        select = "isRead";
        chat.isRead = isRead == "true" ? true : false;
      } else {
        return res.status(200).json({
          status: "failed",
          message: `No ${select} found`,
        });
      }
      await chat.save();
      return res.status(200).json({
        status: "success",
        message: `${select} updated`,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export default ChatController;
