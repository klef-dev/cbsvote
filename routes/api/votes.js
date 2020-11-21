const express = require("express").Router();
const { verifyToken } = require("../../app/Middleware/verifyToken");
const { checkVote } = require("../../app/Middleware/vote");
const { vote } = require("../../app/Controllers/Http/VoteController");
const router = express;

router.post("/", verifyToken, checkVote, vote);

module.exports = router;
