const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      ref: "user",
      required: true,
    },
    likes: {
      type: Array,
    },
    comments: [
      {
        // commentID: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   required: true,
        //   default: mongoose.Types.ObjectId,
        // },
        userCommented: String,
        commentText: String,
        commentDate: String,
    //     replies: [{
    //       replyID:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         default: mongoose.Types.ObjectId,
    //       }
    //       userReplied:String,
    //       replyText:String,
    //       replyDate:String,
    //     }],
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
