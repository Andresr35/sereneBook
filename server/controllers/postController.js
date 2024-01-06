const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

/**
 * Make sure comment author id is the same as the token id
 * delete comment
 * send 204
 */
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { commentID } = req.params;
  const tokenUserID = req.userID;

  const post = await Post.findOne(
    { "comments._id": commentID },
    {
      comments: { $elemMatch: { _id: commentID } },
    }
  )
    .populate({
      path: "comments",
      populate: "author",
    })
    .exec();

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
