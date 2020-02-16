import React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import SendMessageForm from './send_message_form';
import MessageList from './message_list';
import { createMessage, receiveMessage } from '../../actions/chat_actions';
import { getOtherUsername } from '../../util/chat_api_util';

class ConversationShow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // consider fetching specific conversation here,
    // if currentConversation is defined
    
    // set up chat
    const { currentUser } = this.props;
    this.socket = socketIOClient();

    // tell chat server which user this is
    this.socket.emit('identify_user', currentUser);

    // how to handle a new message from the server
    this.socket.on('receive_message', message => {
      this.props.receiveMessage(message);
    });
  }
  render() {
    const { currentUser, currentConversation, messages, sendMessage } = this.props;
    if (currentConversation) {
      let otherPerson = getOtherUsername(currentUser, currentConversation);
      return (
        <div className="conversation-show">
          <h2>You are chatting with: { otherPerson }</h2>
          <MessageList user={currentUser} messages={messages} conversation={currentConversation} />
          <SendMessageForm conversation={currentConversation} sendMessage={sendMessage} />
        </div>
      );
    } else {
      return (<p>No conversation loaded.</p>)
    }
  }
}

const mSTP = ({ session: { user }, chat: { conversations: { currentConversation, conversations }, messages } }) => ({
  currentUser: user,
  currentConversation: conversations[currentConversation],
  messages,
});

const mDTP = dispatch => ({
  sendMessage: message => dispatch(createMessage(message)),
  receiveMessage: message => dispatch(receiveMessage({ message })),
});

export default connect(mSTP, mDTP)(ConversationShow);