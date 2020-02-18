import './conversations.css'
import React from 'react';
import { connect } from 'react-redux';
import { fetchConversations, setCurrentConversation } from '../../actions/chat_actions';
import { fetchUsers } from '../../actions/user_actions';
import ConversationListItem from './conversation_list_item';
import DEVONLYCreateConversationForm from './create_conversation_form';

class ConversationList extends React.Component {
  componentDidMount() {
    this.props.fetchConversations();
    this.props.fetchUsers();
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
});

export default connect(mSTP, mDTP)(ConversationList);