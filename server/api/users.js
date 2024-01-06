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
router.get("/:userID", getUser);
router.get("/:userID/messages", getUserMessages);
router.get("/:userID/posts", getUserPosts);

module.exports = router;
