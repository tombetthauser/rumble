import socketIOClient from "socket.io-client";

class ChatClient {
    constructor() {
        this.socket = socketIOClient();
    }

    connectAs(user) {
        this.socket.emit('identify_user', user);
    }
}

export default ChatClient;