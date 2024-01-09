const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("../jwt");
const User = require("../models/User");
const Post = require("../models/Post");
// const { body, validationResult } = require("express-validator");

exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password, age, gender, bio, picture } = req.body;
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
    picture,
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
  if (!email && !password)
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
  const user = await User.findById(req.params.userID)
    .populate(["friendRequests", "friends"])
    .exec();
  res.json({
    message: "Attatched is the user",
    user,
    status: 200,
  });
});

exports.getUserPosts = asyncHandler(async (req, res, next) => {
  const { includeFriends } = req.query;
  let user = { friends: [] };
  if (includeFriends == "true") {
    user = await User.findById(req.params.userID, "friends").exec();
  }
  const posts = await Post.find({
    author: [req.params.userID, ...user.friends],
  })
    .sort({ timestamp: "desc" })
    .populate(["author", { path: "comments", populate: "author" }])
    .exec();
  return res.status(200).json({
    message: "User Posts",
    status: 200,
    posts,
  });
});

// Friend requested gets friend request. If friend request exists already, it is taken away.
//  if they are friends already, send back a message back
exports.postFriendRequest = asyncHandler(async (req, res, next) => {
  const { friendID } = req.params;
  const { userID } = req.body;
  if (!userID)
    return res.status(400).json({
      message: "UserID was not provided",
      status: 400,
    });
  if (friendID.length != 24 && userID.length != 24)
    return res.status(400).json({
      message: "Friend and user ID must be 24 char long",
      status: 400,
    });
  const userRecieving = await User.findById(friendID)
    .populate(["friendRequests", "friends"])
    .exec();
  if (!userRecieving)
    return res.status(400).json({ message: "User not found", status: 400 });
  const requester = await User.findById(userID).exec();
  if (!requester)
    return res.status(400).json({ message: "User not found", status: 400 });
  const areFriends = requester.friends.includes(userID);
  const isRequested = userRecieving.friendRequests.indexOf(userID);

  if (areFriends) {
    userRecieving.friendRequests.splice(isRequested, 1);
    return res.status(400).json({
      message: "They are friends already",
      status: 400,
    });
  }
  if (isRequested == -1) {
    userRecieving.friendRequests.push(userID);
  } else {
    userRecieving.friendRequests.splice(isRequested, 1);
  }

  await userRecieving.save();
  res.status(201).json({
    status: 201,
    message: "Handled Friend Request",
    userRecieving,
  });
});

// User is either rejecting or accepting friend request, if rejected splice
//  friend request. if accepted add this requested user on the friends list of both?
//  if they are already friends, just take off the friend request.
exports.putFriendRequest = asyncHandler(async (req, res, next) => {
  const { friendID } = req.params;
  const { userID, accepted } = req.body;
  if (!userID)
    return res.status(400).json({
      message: "UserID was not provided",
      status: 400,
    });
  if (friendID.length != 24 && userID.length != 24)
    return res.status(400).json({
      message: "Friend and user ID must be 24 char long",
      status: 400,
    });
  const userRequesting = await User.findById(friendID).exec();
  if (!userRequesting)
    return res.status(400).json({ message: "Friend not found", status: 400 });
  const responder = await User.findById(userID).exec();
  if (!responder)
    return res.status(400).json({ message: "User not found", status: 400 });
  const areFriends = responder.friends.includes(userRequesting._id);
  const requestIndex = responder.friendRequests.indexOf(userRequesting._id);

  if (requestIndex == -1) {
    return res.status(400).json({
      message: "You did not have a friend request from this user",
      status: 400,
      requestIndex,
      userRequesting,
      responder,
    });
  }
  if (areFriends) {
    responder.friendRequests.splice(requestIndex, 1);
    await responder.save();
    return res.status(200).json({
      message: "They are friends already",
      status: 200,
      responder,
      userRequesting,
    });
  }
  if (accepted) {
    responder.friendRequests.splice(requestIndex, 1);
    userRequesting.friends.push(responder._id);
    responder.friends.push(userRequesting._id);
    await responder.save();
    await userRequesting.save();
    return res.status(200).json({
      message: "They are now friends",
      status: 200,
      userRequesting,
      responder,
    });
  }
  responder.friendRequests.splice(requestIndex, 1);
  await responder.save();
  return res.status(200).json({
    status: 200,
    message: "Friend request was rejected",
    userRequesting,
    responder,
  });
});
