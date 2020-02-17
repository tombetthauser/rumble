import React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import SendMessageForm from './send_message_form';
import MessageList from './message_list';
import { createMessage, receiveMessage } from '../../actions/chat_actions';
import { fetchUsers } from '../../actions/user_actions';
// import { getOtherUsername } from '../../util/chat_api_util';

class ConversationShow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // consider fetching specific conversation here,
    // if currentConversation is defined
    
    // get all users
    this.props.fetchUsers();

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
    const { currentUser, currentConversation, messages, sendMessage, allUsers } = this.props;
    if (currentConversation && allUsers) {
      // let otherPerson = { username: 'IDK' } //getOtherUsername(currentUser, currentConversation);
      // debugger;
      let otherPersonId = currentConversation.participants.filter(participant => participant._id !== currentUser._id)[0]._id;
      let otherPerson = allUsers[otherPersonId];
      return (
        <div className="conversation-show">
          <h2>You are chatting with: { otherPerson.username }</h2>
          <div className="aside-match-link-div" className="aside-match-link-container">
            <div className="aside-match-link-image" style={{ backgroundImage: `url(${otherPerson.profile_url})` }}></div>
            <span className="aside-match-link-text">{otherPerson.username}</span>
          </div>
          <MessageList user={currentUser} messages={messages} conversation={currentConversation} allUsers={allUsers} />
          <SendMessageForm conversation={currentConversation} sendMessage={sendMessage} />
        </div>
      );
    } else {
      return (<p>No conversation loaded.</p>)
    }
  }
}

const mSTP = ({ session: { user }, chat: { conversations: { currentConversation, conversations }, messages }, users }) => ({
  currentUser: user,
  currentConversation: conversations[currentConversation],
  messages,
  allUsers: users
});

const mDTP = dispatch => ({
  sendMessage: message => dispatch(createMessage(message)),
  receiveMessage: message => dispatch(receiveMessage({ message })),
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mSTP, mDTP)(ConversationShow);