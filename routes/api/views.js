const express = require("express").Router();
const {
  index,
  category,
  register,
  login,
  logout,
  vote
} = require("../../app/Controllers/Http/ViewController");
const { verifyCookieToken } = require("../../app/Middleware/verifyToken");
const router = express;

router.get("/", verifyCookieToken, index);
router.get("/category", verifyCookieToken, category);
router.get("/vote/:link", verifyCookieToken, vote);

router.get("/auth/register", verifyCookieToken, register);
router.get("/auth/login", verifyCookieToken, login);
router.get("/auth/logout", verifyCookieToken, logout);

module.exports = router;
