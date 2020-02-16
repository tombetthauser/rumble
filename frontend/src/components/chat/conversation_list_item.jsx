import React from 'react';
import { Link } from 'react-router-dom';

import { getOtherUsername } from '../../util/chat_api_util';

const ConversationListItem = ({ conversation, currentUser, setCurrentConversation }) => {
  let otherPerson = getOtherUsername(currentUser, conversation);

  const setConversation = conversationId => () => {
    setCurrentConversation(conversationId);
  }

  return (
    <Link to="/app/connections">
      <div className="aside-match-link-div" className="aside-match-link-container" onClick={setConversation(conversation._id)}>
        <div className="aside-match-link-image"></div>
        <span className="aside-match-link-text">{otherPerson}</span>
      </div>
    </Link>
  );
}

export default ConversationListItem;