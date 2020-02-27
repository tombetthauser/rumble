const socketIOClient = require("socket.io-client");
const Conversation = require('../models/chat/Conversation');
const CHAT_SERVER_ENDPOINT = require("../config/keys").CHAT_SERVER_ENDPOINT;

// to be set dynamically in production with process.env.CHAT_SERVER_URL
const endpoint = CHAT_SERVER_ENDPOINT;

class ChatServerClient {
  constructor() {
    this.socket = socketIOClient(endpoint);
  }

  dispatchReceiveMessage(message) {
    // fetch the conversation in order to get its participants
    Conversation.findOne(message.conversationId).exec((err, conversation) => {
        if (err) throw err;
        // tell the chat server what message was sent between which people
        let payload = {
          participants: conversation.participants,
          message,
        }
        this.socket.emit('broadcast_message', payload);
    })
  }

  dispatchNewConversation(conversation) {
    console.log("dispatched new convo")
    let participants = conversation.participants;
    this.socket.emit('new_conversation', participants);
  }
}

module.exports = ChatServerClient;