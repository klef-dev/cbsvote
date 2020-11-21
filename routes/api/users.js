const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  register,
  login
} = require("../../app/Controllers/Http/UserController");
const { verifyToken } = require("../../app/Middleware/verifyToken");

router.get("/", verifyToken, getCurrentUser);

router.post("/login", login);
router.post("/register", register);

module.exports = router;
