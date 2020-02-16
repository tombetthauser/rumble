const Conversation = require('../models/chat/Conversation');
const Message = require('../models/chat/Message');
const ChatServerClient = require('../util/chat_server_client');

// get all conversations that logged in user is part of
exports.getConversations = function(req, res) {
	Conversation.find({ participants: req.user._id })
	.populate({
		path: 'participants',
		select: 'username'
	})
	.populate('messages')
	.exec(function(err, conversations) {
		// now we either have an error, or a bunch of conversations
		if (err) throw err;

		// because this is async, we need to manually keep track
		// that we've updated all conversations
		let count = 0;
		let serializedConversations = {};
		let serializedMessages = {}

		conversations.forEach(conversation => {
			// serialize the conversation
			serializedConversations[conversation._id] = conversation;

			// serialize all messages related to this conversation
			Message.find({ conversationId: conversation._id })
			.populate({path: 'author', select: '_id username'})
			.exec((err, messages) => {
				messages.forEach(message => {
					serializedMessages[conversation._id] ? (
						// messages exist? push
						serializedMessages[conversation._id].push(message)
					) : (
						// no messages? start the array
						serializedMessages[conversation._id] = [message]
					);
				})

				// we've updated this conversation
				count++;

				// did we get all of them?
				if (count === conversations.length) {
					res.status(200).json({
						conversations: serializedConversations,
						messages: serializedMessages,
					})
				}
			})
		});
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
	
	if (!req.body.username) {
		return res.status(422).json({ error: "Please provide a recipient" });
	}

	User.findOne({ username: req.body.username}).exec((err, recipient) => {
		if (err) throw err;

		if (recipient) {
			const conversation = new Conversation({
				participants: [req.user._id, recipient._id]
			});

			conversation.save(function (err, newConversation) {
				if (err) throw err;
				Conversation.findOne({ _id: newConversation._id })
				.populate({
					path: 'participants',
					select: 'username'
				})
				.exec((err, conversation) => {
					if (err) throw err;
					return res.status(200).json({ conversation: newConversation });
				});
			});
		} else {
			return res.status(404).json({ error: 'invalid recipient' });
		}
	})
};

// send a message
exports.sendMessage = function(req, res) {
  const message = new Message({
    conversationId: req.body.conversationId,
    body: req.body.message,
    author: req.user._id
  });

  message.save(function(err, newMessage) {
	if (err) throw err;
	Message.findOne(newMessage._id).populate({path: 'author', select: '_id username'}).exec((err, message) => {
		if (err) throw err;

		// tell other users a new message was received
		const chat = new ChatServerClient();
		chat.dispatchReceiveMessage(message);

		// send response back to sender
		return res.status(200).json({ message });
	})
  });
};