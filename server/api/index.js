const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../jwt");
const userRouter = require("./users");
const postRouter = require("./post");

router.get("/", (req, res, next) => {
  res.send("Welcome to serene Book API!");
});

router.use("/users", userRouter);

router.use(authenticateToken);
router.use("/posts", postRouter);

module.exports = router;
