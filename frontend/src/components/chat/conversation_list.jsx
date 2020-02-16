import React from 'react';
import { connect } from 'react-redux';
import { fetchConversations, setCurrentConversation } from '../../actions/chat_actions';
import ConversationListItem from './conversation_list_item';
import DEVONLYCreateConversationForm from './create_conversation_form';

class ConversationList extends React.Component {
  componentDidMount() {
    this.props.fetchConversations();
  }

  renderConversations() {
    const { conversations, currentUser, setCurrentConversation } = this.props;
    if (Object.keys(conversations).length > 0) {
      return Object.values(conversations).map(conversation => {
        return (
          <li>
            <ConversationListItem
              conversation={conversation}
              currentUser={currentUser}
              setCurrentConversation={setCurrentConversation}
            />
          </li>
        );
      });
    } else {
      return <li>No conversations to show.</li>;
    }
  }
  
  render() {
    return (
      <div>
        <h2>Conversations</h2>
        <DEVONLYCreateConversationForm />
        <ul>{ this.renderConversations() }</ul>
      </div>
    );
  }
}

const mSTP = state => ({
  conversations: state.chat.conversations.conversations,
  currentUser: state.session.user,
});

const mDTP = dispatch => ({
  fetchConversations: () => dispatch(fetchConversations()),
  setCurrentConversation: conversationId => dispatch(setCurrentConversation(conversationId)),
});

export default connect(mSTP, mDTP)(ConversationList);