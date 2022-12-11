import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [String],
  updatedAt: {
    type: Date,
  },
  organizerType: {
    type: String,
  },
  postLink: {
    type: String,
  },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
      },
      isEdited: {
        type: Boolean,
        default: false,
        required: true,
      },
      text: {
        type: String,
        required: true,
        default: "text",
      },
      image: [
        {
          url: {
            type: String,
          },
          public_id: {
            type: String,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          text: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
          },
          isEdited: {
            type: Boolean,
            default: false,
          },
        },
      ],
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  registrationRequired: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  noOfComments: {
    type: Number,
    default: 0,
  },
});

const PostModel = mongoose.model("post", postSchema);
export default PostModel;

// comments: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "comment",
//   },
// ],
