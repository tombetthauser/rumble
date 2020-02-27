// configure how the server will respond to chat actions
const configureChat = (io) => {
  
  // store which socket belongs to which user
  let userChatLookup = {};
  let userConvoLookup = {};

  // what to do when a client/socket connects to the chat server
  io.on("connection", socket => {

    // sockets will identify which user they are
    socket.on("identify_user", user => {
        socket.userID = user._id;
        userChatLookup[socket.userID] = socket;
    });
    socket.on("identify_convo_user", user => {
      socket.userID = user._id;
      userConvoLookup[socket.userID] = socket;
    });

    // when the api receives a new message, it notifies the chat server
    socket.on("broadcast_message", payload => {
      let { participants, message } = payload;

      // notify all participants but the author
      let otherParticipants = participants.filter(p => p !== message.author._id)
      otherParticipants.forEach(participant => {
        if (userChatLookup[participant]) {
          userChatLookup[participant].emit('receive_message', message);
        }
      });
    });

    socket.on("new_conversation", participants => {
      participants.forEach(participant => {
        if (userConvoLookup[participant]) {
          userConvoLookup[participant].emit('receive_conversation', conversation);
        }
      })
    });
  });
};

module.exports = configureChat