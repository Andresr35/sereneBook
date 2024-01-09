const express = require("express");
const { authenticateToken } = require("../jwt");
const router = express.Router();
const {
  getUsers,
  signUp,
  logIn,
  getUser,
  getUserPosts,
  postFriendRequest,
  putFriendRequest,
} = require("../controllers/userController");
const {
  getUserMessages,
  postUserMessages,
} = require("../controllers/messageController");

router.post("/", signUp);
router.post("/login", logIn);

// require authentication
router.use(authenticateToken);
router.get(
  "/authenticate",
  async (req, res, next) => {
    req.statusCode = 200;
    req.params.userID = req.userID;
    next();
  },
  getUser
);
router.get("/", getUsers);
router.get("/:userID", getUser);
router.get("/:userID/messages", getUserMessages);
router.post("/:userID/messages", postUserMessages);
router.get("/:userID/posts", getUserPosts);
router.post("/:friendID/friendRequests", postFriendRequest);
router.put("/:friendID/friendRequests", putFriendRequest);

module.exports = router;
