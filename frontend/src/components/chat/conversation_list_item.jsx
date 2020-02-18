import './conversations.css'
import React from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_IMAGE = "https://images.squarespace-cdn.com/content/v1/5a4d3b6…/1537…EDFOm1kBS/profile-placeholder-image-gray-silhouette-no-vector-21542863.jpg"

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
          <div className="aside-match-link-image" style={{ backgroundImage: `url(${otherPerson.profile_url ? otherPerson.profile_url : DEFAULT_IMAGE})` }}></div>
          <span className="aside-match-link-text">{otherPerson.username}</span>
        </div>
      </Link>
    );
  } else {
    return null;
  }
}

export default ConversationListItem;