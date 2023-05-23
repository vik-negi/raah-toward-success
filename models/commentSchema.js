import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
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
  { Timestamp: true }
);

const Comment = mongoose.model("doubt", commentsSchema);
export default Comment;
