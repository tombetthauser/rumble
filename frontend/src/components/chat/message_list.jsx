import './conversations.css'
import React from 'react';

// import { getOtherUsername } from '../../util/chat_api_util';

const renderMessages = (messages, other ) => (
  messages.map((message, i) => <li className={ (message.author.username === other.username) ? "individual-message-other" : "individual-message-self" } key={i}>{message.author.username}: {message.body}</li>)
)

const MessageList = ({ user, conversation, messages, allUsers }) => {
  let relevantMessages = messages[conversation._id];

  let otherPersonId = conversation.participants.filter(participant => participant._id !== user._id)[0]._id;
  let otherPerson = allUsers[otherPersonId];

  if (relevantMessages) {
    return (
      <div className="messages">
        <ul className="message-list">{renderMessages(relevantMessages, otherPerson)}</ul>
      </div>
    );
  } else {
    return <p className="messages-get-started-text" >Send {otherPerson.username} a Message!</p>;
  }
}

export default MessageList;