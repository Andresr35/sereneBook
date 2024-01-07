const express = require("express");
const { deleteComment, addComment } = require("../controllers/postController");
const router = express.Router();

router.delete("/comments/:commentID", deleteComment);
router.post("/:postID/comments", addComment);

module.exports = router;
