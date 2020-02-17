import { connect } from "react-redux";
import EncountersUser from "./encounters_user";
// import {update} from '../../../../actions/session_actions'
import { matchOrLike } from "../../../../actions/match_actions";

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => ({});

 


import { fetchUsers } from '../../../../actions/user_actions'
//import Meeting from "./meeting";

const mapStateToProps = state => ({
  users: Object.values(state.users)
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  // update: (user, userId) => dispatch(update(user, userId)),
  matchOrLike: recipientId => dispatch(matchOrLike(recipientId)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(EncountersUser);
