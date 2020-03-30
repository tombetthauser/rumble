import { connect } from "react-redux";
import EncountersUser from "./encounters_user";
// import {update} from '../../../../actions/session_actions'
import { matchOrLike } from "../../../../actions/match_actions";

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => ({});

 


import { fetchUsers } from '../../../../actions/user_actions'
//import Meeting from "./meeting";

const mapStateToProps = state => ({
  sessionUser: state.session,
  users: Object.values(state.users),
  // currentUser: state.users[state.session.user._id],
  availableUsers: Object.values(state.users).filter(availableUser => {
    if (availableUser && state.session.user && state.session.user.liked_users) {
      let sessionUser = state.session.user;
      let isNotMe = availableUser._id !== sessionUser._id;
      let alreadyLiked = state.users[sessionUser._id].liked_users.includes(availableUser._id)
      return (isNotMe && !alreadyLiked);
    } else {
      return false;
    }
  }),
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  // update: (user, userId) => dispatch(update(user, userId)),
  matchOrLike: recipientId => dispatch(matchOrLike(recipientId)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(EncountersUser);
