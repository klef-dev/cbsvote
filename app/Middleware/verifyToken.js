const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const verifyToken = (request, response, next) => {
  const bearerHeader = request.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    request.token = bearerToken;
    next();
  } else {
    response.status(403).json({ msg: "JWT token required", error: true });
  }
};

const verifyCookieToken = (request, response, next) => {
  const cookie = request.cookies.tokenizeMe;
  if (typeof cookie !== "undefined") {
    request.token = cookie;
  }
  next();
};

const verifyJWT = async (token) => {
  let user = jwt.verify(token, process.env.JWT_SECRET);
  return auth(user);
};

const auth = async (user) => {
  return User.findOne({ where: { id: user.id } });
};

exports.verifyToken = verifyToken;
exports.verifyCookieToken = verifyCookieToken;
exports.verifyJWT = verifyJWT;
