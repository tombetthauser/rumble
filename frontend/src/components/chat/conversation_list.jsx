import './conversations.css'
import React from 'react';
import { connect } from 'react-redux';
import { fetchConversations, setCurrentConversation, receiveConversation } from '../../actions/chat_actions';
import { fetchUsers } from '../../actions/user_actions';
import ConversationListItem from './conversation_list_item';
import DEVONLYCreateConversationForm from './create_conversation_form';
import socketIOClient from 'socket.io-client';

class ConversationList extends React.Component {
  componentDidMount() {
    this.props.fetchConversations();
    this.props.fetchUsers();

    // listen for incoming conversations
    const { currentUser } = this.props;
    this.socket = socketIOClient();
    // tell chat server we're listening for convos
    this.socket.emit('identify_convo_user', currentUser);
    // how to handle a new message from the server
    this.socket.on('new_conversation', conversation => {
      console.log('received new conversation')
      this.props.receiveConversation(conversation);
    });
  }

  renderConversations() {
    const { conversations, currentUser, setCurrentConversation, allUsers } = this.props;
    if (Object.keys(conversations).length > 0) {
      return Object.values(conversations).map(conversation => {
        return (
          <li>
            <ConversationListItem
              conversation={conversation}
              currentUser={currentUser}
              setCurrentConversation={setCurrentConversation}
              allUsers={allUsers}
            />
          </li>
        );
      });
    } else {
      return <div className="conversations-none-yet-sidebar">No Conversations Yet!</div>;
    }
  }
  
  render() {
    return (
      <div>
        {/* <h2>Conversations</h2> */}
        <DEVONLYCreateConversationForm />
        <ul>{ this.renderConversations() }</ul>
      </div>
    );
  }
}

const mSTP = state => ({
  conversations: state.chat.conversations.conversations,
  currentUser: state.session.user,
  allUsers: state.users,
});

const mDTP = dispatch => ({
  fetchConversations: () => dispatch(fetchConversations()),
  fetchUsers: () => dispatch(fetchUsers()),
  setCurrentConversation: conversationId => dispatch(setCurrentConversation(conversationId)),
  receiveConversation: conversation => dispatch(receiveConversation(conversation))
});

export default connect(mSTP, mDTP)(ConversationList);