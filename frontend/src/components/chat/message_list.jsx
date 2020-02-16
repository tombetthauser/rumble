import React from 'react';

import { getOtherUsername } from '../../util/chat_api_util';

const renderMessages = messages => (
  messages.map((message, i) => <li key={i}>{message.author.username}: {message.body}</li>)
)

const MessageList = ({ user, conversation, messages }) => {
  let relevantMessages = messages[conversation._id];

  if (relevantMessages) {
    return (
      <div className="messages">
        <ul className="message-list">{renderMessages(relevantMessages)}</ul>
      </div>
    );
  } else {
    return <p>No messages between you and {getOtherUsername(user, conversation)}</p>;
  }
}

export default MessageList;