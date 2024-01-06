const jwt = require("jsonwebtoken");

exports.authenticateToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.userID = payload.userID;

    return next();
  });
};

exports.generateToken = (userID) => {
  const opts = {};
  opts.expiresIn = "1h";
  return jwt.sign({ userID }, process.env.TOKEN_SECRET, opts);
};
