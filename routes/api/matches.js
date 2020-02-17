const express = require("express");
const router = express.Router();
const passport = require("passport");

const MatchController = require("../../controllers/match");

const requireAuth = passport.authenticate("jwt", { session: false });

// get all conversations related to logged in user
router.post("/", requireAuth, MatchController.matchOrLike);

module.exports = router;
