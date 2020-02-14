const Conversation = require('../models/chat/Conversation');
const Message = require('../models/chat/Message');

// get all conversations that logged in user is part of
exports.getConversations = function(req, res) {
	console.log('++++ processing request');
	Conversation.find({ participants: req.user._id })
	.select("_id") // only need _id
	.exec(function(err, conversations) {
			// now we either have an error, or a bunch of conversations
			console.log("++++ executing query");
			if (err) throw err;
			return res.status(200).json({ conversations });

			// Set up empty array to hold conversations + most recent message
			// let conversationPreviews = [];
			
			// extracting the first message from each conversation
			// conversations.forEach(function(conversation) {
			// 		console.log("++++ looping over conversations");
			// 		Message.find({ conversationId: conversation._id })
			// 		.sort("-createdAt")
			// 		.limit(1)
			// 		.populate({
			// 				// returns `firstName lastName` instead of `_id` when invoking `message.author`
			// 				path: "author",
			// 				select: "profile.firstName profile.lastName"
			// 		})
			// 		.exec(function(err, message) {
			// 				if (err) throw err;
			// 				console.log("++++ going over messagw");
			// 				// insert this into the conversations array
			// 				conversationPreviews.push(message);
			// 				if (conversationPreviews.length === conversations.length) {
			// 						// finally send all the conversations
			// 						return res.status(200).json({ conversations: conversationPreviews });
			// 				}
			// 		});
			// });
	});
};

// get all messages that belong to conversationId
exports.getConversation = function(req, res) {
	Message.find({ conversationId: req.params.conversationId })
	.select("createdAt body author")
	.sort("-createdAt")
	.populate({
		path: "author",
		select: "profile.firstName profile.lastName"
	})
	.exec(function(err, messages) {
		if (err) throw err;
		return res.status(200).json({ conversation: messages });
	});
};

// create a new conversation
exports.newConversation = function(req, res) {
	if (!req.body.recipientId) {
		return res.status(422).json({ error: "Please provide a recipient" });
	}

  const conversation = new Conversation({
    participants: [req.user._id, req.body.recipientId]
  });

  conversation.save(function(err, newConversation) {
		if (err) throw err;
		return res.status(200).json({ conversation });
  });
};

// send a message
exports.sendMessage = function(req, res) {
  const message = new Message({
    conversationId: req.body.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  message.save(function(err, message) {
    if (err) throw err;

    return res.status(200).json({ message });
  });
};