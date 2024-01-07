const Post = require("../models/Post");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

/**
 * Make sure comment author id is the same as the token id
 * delete comment
 * send 204
 */
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { commentID } = req.params;
  const tokenUserID = req.userID;
  if (commentID.length != 24)
    return res
      .status(400)
      .json({ message: "Comment ID must be 24 char long", status: 400 });

  const post = await Post.findOne(
    { "comments._id": new mongoose.Types.ObjectId(commentID) },
    {
      comments: { $elemMatch: { _id: commentID } },
    }
  ).populate({
    path: "comments",
    populate: "author",
  });
  console.log(post);
  if (!post)
    return res.status(400).json({ message: "Post not found", status: 400 });
  if (post.comments[0].author._id != tokenUserID)
    return res.status(401).json({
      message: "You must be the author of this comment in order to delete",
      status: 401,
    });
  const newPost = await post.updateOne(
    {
      $pull: { comments: { _id: commentID } },
    },
    { new: true }
  );
  res.status(200).json({
    message: "Deleted Comment",
    newPost,
    status: 200,
  });
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const { message, userID } = req.body;
  if (!message || !userID)
    return res.status(400).json({
      message: "message or authorID were not provided",
      status: 400,
    });
  if (postID.length != 24)
    return res
      .status(400)
      .json({ message: "Comment ID must be 24 char long", status: 400 });
  const post = await Post.findById(postID).exec();
  if (!post)
    return res.status(400).json({ message: "Post not found", status: 400 });
  post.comments.push({ message: message, author: userID });
  await post.save();
  res.status(201).json({
    message: "Comment was created!",
    status: 201,
    newPost,
  });
});
