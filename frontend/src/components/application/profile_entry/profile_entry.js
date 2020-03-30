import "./profile_entry.css";
import React from "react";
import { withRouter } from "react-router-dom";

const DEFAULT_IMAGE = "https://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png";


class ProfileEntry extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { currentUser, currentConversation, messages, sendMessage, allUsers } = this.props;
    const tempUser = { name: "Terry", ringName: "Hulk Hogan", location: "Augusta, GA", age: "66" };

    const width = this.props.location.pathname === "/app/connections" ? "300px" : "0px"

    // alert("hello!")

    let otherPerson = null;

    if (currentConversation) {
      let otherPersonId = currentConversation.participants.filter(participant => participant._id !== currentUser._id)[0]._id;
      otherPerson = allUsers[otherPersonId];
    }

    console.log("otherPerson ------------------------")
    console.log(otherPerson)

    // encodeURI(otherPerson.profile_url)

    return (
      <div className="profile-entry-div" style={{ width: width, backgroundImage: `url("${(otherPerson && otherPerson.profile_url) ? otherPerson.profile_url : DEFAULT_IMAGE }")` }} >
        <div className="profile-entry-text-div">
          <span><span className="bold-text">name: </span>{(currentConversation && allUsers) ? otherPerson.username : "???"}</span>
          <span className="profile-about-text" ><span className="bold-text">about: </span>{(currentConversation && allUsers) ? otherPerson.biography : "???"}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileEntry);






// import './conversations.css'
// import React from 'react';
// import { connect } from 'react-redux';
// import socketIOClient from 'socket.io-client';

// import SendMessageForm from './send_message_form';
// import MessageList from './message_list';
// import { createMessage, receiveMessage } from '../../actions/chat_actions';
// import { fetchUsers } from '../../actions/user_actions';
// // import { getOtherUsername } from '../../util/chat_api_util';

// class ConversationShow extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     // consider fetching specific conversation here,
//     // if currentConversation is defined

//     // get all users
//     this.props.fetchUsers();

//     // set up chat
//     const { currentUser } = this.props;
//     this.socket = socketIOClient();

//     // tell chat server which user this is
//     this.socket.emit('identify_user', currentUser);

//     // how to handle a new message from the server
//     this.socket.on('receive_message', message => {
//       this.props.receiveMessage(message);
//     });
//   }
//   render() {
//     const { currentUser, currentConversation, messages, sendMessage, allUsers } = this.props;
//     if (currentConversation && allUsers) {
//       // let otherPerson = { username: 'IDK' } //getOtherUsername(currentUser, currentConversation);
//       // debugger;
//       let otherPersonId = currentConversation.participants.filter(participant => participant._id !== currentUser._id)[0]._id;
//       let otherPerson = allUsers[otherPersonId];
//       return (
//         <div className="conversation-show">
//           {/* <h2>You are chatting with: { otherPerson.username }</h2> */}
//           <div className="aside-match-link-div" className="aside-match-link-container">
//             <div className="aside-match-link-image" style={{ backgroundImage: `url(${otherPerson.profile_url})` }}></div>
//             <span className="aside-match-link-text">{otherPerson.username}</span>
//           </div>
//           <MessageList user={currentUser} messages={messages} conversation={currentConversation} allUsers={allUsers} />
//           <SendMessageForm conversation={currentConversation} sendMessage={sendMessage} />
//         </div>
//       );
//     } else {
//       return (<p className="conversations-none-yet">Find a Match and Get Chatting!</p>)
//     }
//   }
// }

// const mSTP = ({ session: { user }, chat: { conversations: { currentConversation, conversations }, messages }, users }) => ({
//   currentUser: user,
//   currentConversation: conversations[currentConversation],
//   messages,
//   allUsers: users
// });

// const mDTP = dispatch => ({
//   sendMessage: message => dispatch(createMessage(message)),
//   receiveMessage: message => dispatch(receiveMessage({ message })),
//   fetchUsers: () => dispatch(fetchUsers()),
// });

// export default connect(mSTP, mDTP)(ConversationShow);