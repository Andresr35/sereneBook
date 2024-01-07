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
  const tokenUserID = req.userID;

  if (!message || !userID)
    return res.status(400).json({
      message: "message or authorID were not provided",
      status: 400,
    });
  if (postID.length != 24)
    return res
      .status(400)
      .json({ message: "Comment ID must be 24 char long", status: 400 });
  if (userID != tokenUserID)
    return res.status(401).json({
      message: "Your userID and token ID do not match",
      status: 401,
    });
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

exports.handleLike = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const { userID } = req.body;
  const tokenUserID = req.userID;

  if (!userID)
    return res.status(400).json({
      message: "userID was not provided",
      status: 400,
    });
  if (postID.length != 24 || userID.length != 24)
    return res
      .status(400)
      .json({ message: "Post or User ID must be 24 char long", status: 400 });
  if (userID != tokenUserID)
    return res.status(401).json({
      message: "Your userID and token ID do not match",
      status: 401,
    });

  const post = await Post.findById(postID).exec();
  if (!post)
    return res.status(400).json({ message: "Post not found", status: 400 });
  const isLiked = post.likes.includes({ _id: userID });
  if (isLiked) {
    post.likes.find({ _id: userID }).deleteOne();
  } else {
    post.likes.push({ _id: userID });
  }
  await post.save();
  res.status(201).json({
    message: "Post like handled",
    status: 200,
    newPost: post,
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const { postID } = req.params;
  const tokenUserID = req.userID;
  if (postID.length != 24)
    return res
      .status(400)
      .json({ message: "Post ID must be 24 char long", status: 400 });

  const post = await Post.findById(postID).exec();
  if (!post)
    return res.status(400).json({ message: "Post not found", status: 400 });
  if (post.author != tokenUserID)
    return res.status(401).json({
      message: "You are not the author of this post",
      status: 401,
    });
  await post.deleteOne();
  res.status(200).json({
    message: "Post was deleted",
    status: 200,
  });
});
