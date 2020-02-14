// configure how the server will respond to chat actions
const configureChat = (io) => {
  
  let userLookup = {};

  io.on("connection", socket => {

    // sockets will identify which user they are
    socket.on("identify_user", user => {
        console.log(`received identify_user from ${user.username}, id: ${user._id}`);
        socket.userID = user._id;
        userLookup[socket.userID] = socket;
    });

    // socket.on("disconnect", () => {
    //   console.log('user disconnected');
    // });
  });
};

module.exports = configureChat