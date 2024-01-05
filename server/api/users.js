const express = require("express");
const { authenticateToken } = require("../jwt");
const router = express.Router();
const {
  getUsers,
  signUp,
  logIn,
  getUser,
  getUserMessages,
  getUserPosts,
} = require("../controllers/userController");

router.post("/", signUp);
router.post("/login", logIn);

// require authentication
router.use(authenticateToken);

router.get("/", getUsers);
router.get("/:userId", getUser);
router.get("/:userId/messages", getUserMessages);
router.get("/:userId/posts", getUserPosts);

module.exports = router;
