const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("../jwt");
const User = require("../models/User");
const Message = require("../models/Message");
const Post = require("../models/Post");
// const { body, validationResult } = require("express-validator");

exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password, age, gender, bio } = req.body;
  if (!email || !name || !password)
    res
      .status(400)
      .json({ status: 400, message: "email, name, or password is missing" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    age,
    gender,
    bio,
  });
  await user.save();
  const token = jwt.generateToken(email);
  res.status(201).json({
    status: 201,
    message: "Signing Up",
    token,
    user: user.toJSON({ useProjection: true }),
  });
});

exports.logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "Email or password were not provided",
      status: 400,
    });
  const user = await User.findOne({ email }).select("+password").exec();
  if (!user)
    return res.status(400).json({
      message: "User was not found",
      status: 400,
    });
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({
      message: "Incorrect Password",
      status: 400,
    });
  const token = jwt.generateToken(user._id);
  delete user._doc.password;
  res.status(200).json({
    status: 200,
    message: "Logged in",
    token,
    user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();
  // console.log(req.userID);
  res.status(200).json({
    message: "Attatched are the users",
    users,
    status: 200,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userID).exec();
  res.json({
    message: "Attatched is the user",
    user,
    status: 200,
  });
});

exports.getUserMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    $or: [{ messenger: req.params.userID }, { reciever: req.params.userID }],
  }).exec();
  return res.status(200).json({ message: "Success", status: 200, messages });
});

exports.getUserPosts = asyncHandler(async (req, res, next) => {
  const { include } = req.query;
  let user = { friends: [] };
  if (include == "friends") {
    user = await User.findById(req.params.userID, "friends").exec();
  }
  const posts = await Post.find({
    author: [req.params.userID, ...user.friends],
  })
    .populate(["author", { path: "comments", populate: "author" }])
    .exec();
  return res.status(200).json({
    message: "User Posts",
    status: 200,
    posts,
  });
});
