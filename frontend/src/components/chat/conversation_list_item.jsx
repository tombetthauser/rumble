import React from 'react';
import { Link } from 'react-router-dom';

// import { getOtherUsername } from '../../util/chat_api_util';

const ConversationListItem = ({ conversation, currentUser, setCurrentConversation, allUsers }) => {
  // let otherPerson = getOtherUsername(currentUser, conversation);

  let otherPersonId = conversation.participants.filter(participant => participant._id !== currentUser._id)[0]._id;
  let otherPerson = allUsers[otherPersonId];
  

  const setConversation = conversationId => () => {
    setCurrentConversation(conversationId);
  }

  

  if (Object.keys(allUsers).length > 0) {
    return (
      <Link to="/app/connections">
        <div className="aside-match-link-div" className="aside-match-link-container" onClick={setConversation(conversation._id)}>
          <div className="aside-match-link-image" style={{ backgroundImage: `url(${otherPerson.profile_url})` }}></div>
          <span className="aside-match-link-text">{otherPerson.username}</span>
        </div>
      </Link>
    );
  } else {
    return null;
  }
}

export default ConversationListItem;