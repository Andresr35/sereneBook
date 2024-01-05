const express = require("express");
const router = express.Router();

const userRouter = require("./users");
router.get("/", (req, res, next) => {
  res.send("Welcome to serene Book API!");
});

router.use("/users", userRouter);
module.exports = router;
