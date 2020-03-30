import { connect } from "react-redux";
import ProfileEntry from "./profile_entry";
import { createMessage, receiveMessage } from '../../../actions/chat_actions';
import { fetchUsers } from '../../../actions/user_actions';

const mapStateToProps = ({ session: { user }, chat: { conversations: { currentConversation, conversations }, messages }, users }) => ({
  currentUser: user,
  currentConversation: conversations[currentConversation],
  messages,
  allUsers: users
});

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(createMessage(message)),
  receiveMessage: message => dispatch(receiveMessage({ message })),
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEntry);




