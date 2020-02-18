import './conversations.css'
import React from 'react';

// import { getOtherUsername } from '../../util/chat_api_util';

const renderMessages = messages => (
  messages.map((message, i) => <li key={i}>{message.author.username}: {message.body}</li>)
)

const MessageList = ({ user, conversation, messages, allUsers }) => {
  let relevantMessages = messages[conversation._id];

  let otherPersonId = conversation.participants.filter(participant => participant._id !== user._id)[0]._id;
  let otherPerson = allUsers[otherPersonId];

  if (relevantMessages) {
    return (
      <div className="messages">
        <ul className="message-list">{renderMessages(relevantMessages)}</ul>
      </div>
    );
  } else {
    return <p>No messages between you and {otherPerson.username}</p>;
  }
}

export default MessageList;