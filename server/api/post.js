const express = require("express");
const {
  deleteComment,
  addComment,
  handleLike,
  deletePost,
  addPost,
} = require("../controllers/postController");
const router = express.Router();
router.post("/", addPost);
router.delete("/comments/:commentID", deleteComment);
router.delete("/:postID", deletePost);
router.post("/:postID/comments", addComment);
router.put("/:postID/likes", handleLike);

module.exports = router;
