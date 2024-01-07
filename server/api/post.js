const express = require("express");
const {
  deleteComment,
  addComment,
  handleLike,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

router.delete("/comments/:commentID", deleteComment);
router.delete("/:postID", deletePost);
router.post("/:postID/comments", addComment);
router.put("/:postID/likes", handleLike);

module.exports = router;
