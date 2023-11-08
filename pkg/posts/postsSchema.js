const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: string,
  },
  plot: {
    type: string,
  },
  author: {
    // go naogja avtorot na postot
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
