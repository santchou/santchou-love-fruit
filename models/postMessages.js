const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  name: String,
  message: String,
  creator: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

module.exports = PostMessage;
