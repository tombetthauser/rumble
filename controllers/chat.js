const Conversation = require('../models/chat/Conversation');
const Message = require('../models/chat/Message');

// get all conversations that logged in user is part of
exports.getConversations = function(req, res) {
	Conversation.find({ participants: req.user._id })
	.exec(function(err, conversations) {
		// now we either have an error, or a bunch of conversations
		if (err) throw err;
		
		if (conversations.length > 0) {
			let conversationPreviews = [];

			conversations.forEach(function(conversation) {
				// get the latest message as the message preview
				Message.find({ conversationId: conversation._id })
					.sort("-createdAt")
					.limit(1)
					.populate({
						path: "author",
						select: "username"
					})
					// .exec finally runs the query
					.exec(function(err, previewMessage) {
						if (err) throw err;
						// insert this into the conversations array
						let formattedPreview = {
							conversationId: conversation._id,
							participants: conversation.participants,
							previewMessage,
						}
						conversationPreviews.push(formattedPreview);
						if (conversationPreviews.length === conversations.length) {
							// finally send all the conversations
							return res.status(200).json({ conversations: conversationPreviews });
						}
					});
			});
		} else {
			return res.status(200).json({ conversations });
		}
	});
};

// get all messages that belong to conversationId
exports.getConversation = function(req, res) {
	Message.find({ conversationId: req.params.conversationId })
	.select("createdAt body author")
	.sort("-createdAt")
	.populate({
		path: "author",
		select: "username"
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

  conversation.save(function(err, conversation) {
		if (err) throw err;
		return res.status(200).json({ conversation });
  });
};

// send a message
exports.sendMessage = function(req, res) {
  const message = new Message({
    conversationId: req.params.conversationId,
    body: req.body.message,
    author: req.user._id
  });

  message.save(function(err, message) {
    if (err) throw err;
    return res.status(200).json({ message });
  });
};