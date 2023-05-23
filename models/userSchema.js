import { Timestamp } from "mongodb";
import mongoose, { SchemaType } from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 16,
    },
    socialMedia: {
      type: [
        {
          name: {
            type: String,
            trim: true,
          },
          link: {
            type: String,
            trim: true,
          }
        }
      ],
      default: [],
    },
    skills: {
      type: [
        {
          type: String,
        }
      ],
      default: []
    },
    rollNo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "This is my bio",
      trim: true,
    },
    profileImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dolqf9s3y/image/upload/v1668325949/TikTok_mqkhq0.png",
      },
      public_id: String,
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
      // required: true,
      enm: ["coordinater", "learner", "admin"],
      trim: true,
      default: "learner",
      // type: SchemaType.ObjectId,
    },
    event: {
      type: Array,
      default: [],
    },
    mobile: {
      type: String,
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resource",
      },
    ],
  },
  { Timestamp: true }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
