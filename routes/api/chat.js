const express = require('express');
const router = express.Router();
const passport = require("passport");

const ChatController = require('../../controllers/chat');

const requireAuth = passport.authenticate("jwt", { session: false });

// get all conversations related to logged in user
router.get('/', requireAuth, ChatController.getConversations);

// API ONLY? create a new conversation
router.post('/', requireAuth, ChatController.newConversation);

// get all messages from a specific conversation
router.get('/:conversationId', requireAuth, ChatController.getConversation);

// post a message to a specific conversation
router.post('/:conversationId', requireAuth, ChatController.sendMessage);

module.exports = router;