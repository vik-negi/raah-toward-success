import { ObjectId } from "mongodb";
import PostModel from "../models/postSchema.js";
import UserModel from "../models/userSchema.js";
import { cloudinaryConfig } from "../utils/cloudinary.js";
import Comment from "../models/commentSchema.js";

class PostController {
  static createPost = async (req, res) => {
    // console.log(req.body);
    const {
      title,
      description,
      eventCategory,
      eventStartAt,
      eventEndAt,
      eventDescription,
      tags,
    } = req.body;
    // if (userId == null) {
    //   res.status(400).json({
    //     status: "failed",
    //     message: "User Id is required",
    //   });
    // }

    if (title == null) {
      res.status(400).json({
        status: "failed",
        message: "Title is required",
      });
    }
    if (description == null) {
      res.status(400).json({
        status: "failed",
        message: "Description is required",
      });
    }

    try {
      console.log("req.body", req.body);
      const objId = new ObjectId();
      const eventId = objId.toString();
      // const postModel = {};
      if (req.files && req.files.image) {
        const localpath = req.files.image[0].path;
        const result = await cloudinaryConfig(localpath);
        console.log("result", result);
        const post = new PostModel({
          title: "title",
          description: "description",
          eventId: eventId,
          // userId: req.user._id,
          userId: req.body.userId,
          // eventCategory: eventCategory != null ? eventCategory : "Other",
          eventCategory: "Other",
          eventStartAt: eventStartAt != null ? eventStartAt : Date.now(),
          eventEndAt: eventEndAt != null ? eventEndAt : Date.now() + 1,
          eventDescription: "No description",
          // eventDescription != null ? eventDescription : "No description",
          image: [result.url],
          tags: ["tag"],
        });
        console.log("post ", post);
        const user = await UserModel.findById(req.body.userId);
        console.log("user");
        user.posts.push(post._id);
        console.log("created");
        await post.save();
        res.status(200).json({
          data: post,
          status: "success",
          message: "Post created successfully",
        });
      } else {
        const post = new PostModel({
          title: title,
          description: description,
          image: image,
          eventId: eventId,
          userId: req.user._id,
          eventCategory: eventCategory != null ? eventCategory : "Other",
          eventStartAt: eventStartAt != null ? eventStartAt : Date.now(),
          eventEndAt: eventEndAt != null ? eventEndAt : Date.now() + 1,
          eventDescription:
            eventDescription != null ? eventDescription : "No description",
        });
        console.log("created");
        await post.save();
        res.status(200).json({
          creatorUserId: userId,
          data: post,
          status: "success",
          message: "Post created successfully",
        });
      }
    } catch (err) {
      // console.log("catch err : ", err);
      res.status(500).json({ status: "failed", message: err.message });
    }
  };

  static getAllPosts = async (req, res) => {
    try {
      const posts = await PostModel.find().select("-comments");
      // console.log("posts", posts);
      res.status(200).json({
        data: posts,
        status: "success",
        message: "All posts fetched successfully",
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  };

  static getDoubts = async (req, res) => {
    try {
      var comment = await Comment.find();
      var commentUserData = [];

      for (let i = 0; i < comment.length; i++) {
        var user = await UserModel.findById(comment[i].user);
        commentUserData.push({
          _id: comment[i]._id,
          userId: user._id,
          image: comment[i].image,
          isEdited: comment[i].isEdited,
          text: comment[i].text,
          likes: comment[i].likes,
          createdAt: comment[i].createdAt,
          replies: comment[i].replies,
          name: user.name,
          userImage: user.profileImage,
          username: user.username,
        });
      }
      console.log("send comment : ", commentUserData);
      res.status(200).json({
        data: commentUserData,
        status: "success",
        message: "All comments fetched successfully",
      });
    } catch (err) {
      console.log("err : ", err);
      res.status(500).json({ status: "failed", message: err.message });
    }
  };

  static likeAndUnlikePost = async (req, res) => {
    // console.log("liked");
    try {
      // console.log("req.body", req.body);
      const post = await PostModel.findById(req.body.postId);
      const user = await UserModel.findById(req.user._id);
      // console.log("post", post);
      if (post == null) {
        res.status(400).json({
          status: "failed",
          message: "Post not found",
        });
      }
      // console.log(req.user._id);
      // console.log(post.likedUsers.includes(req.user._id));
      if (post.likedUsers.includes(req.user._id)) {
        console.log("unlike");
        post.likedUsers.pull(req.user._id);
        user.likedPosts.pull(req.body.postId);
        post.likes = post.likes - 1;
        // console.log("post.likes", post.likes);
        // console.log("post.likes", post.likedUsers.length);
        await post.save();
        await user.save();

        res.status(200).json({
          data: post,
          status: "success",
          message: "User like removed successfully",
        });
      } else {
        // console.log("pppppppppp");
        // console.log("post.likedUsers", post.likedUsers);
        post.likedUsers.push(req.user._id);
        user.likedPosts.push(req.body.postId);
        // console.log("post.likedUsers", post.likedUsers);
        const like = post.likes + 1;
        // console.log("post.likes", like);
        post.likes = like;
        await post.save();
        await user.save();
        res.status(200).json({
          data: post,
          status: "success",
          message: "Post liked successfully",
        });
      }
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  };

  static addComment = async (req, res) => {
    try {
      const { comment } = req.body;
      const { postId } = req.params;
      if (!comment || !postId) {
        return res.status(400).json({
          status: "failed",
          message: "comment is required",
        });
      }
      var post = await PostModel.findById(postId);
      const commentData = {
        user: req.user._id,
        text: comment,
      };
      console.log("user ID", req.user._id);
      post.comments.push(commentData);
      post.save();

      return res.status(200).json({
        // data: commentUserData,
        status: "success",
        message: "All posts fetched successfully",
      });
    } catch (err) {
      return res.status(500).json({ status: "failed", message: err.message });
    }
  };
}

export default PostController;
