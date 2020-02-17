import { connect } from "react-redux";
import EditForm from './edit-profile';
import { update, logout } from '../../../../actions/session_actions';


const mSTP = (state) =>({
  user: state.session.user
})

const mDTP = (dispatch) =>({
  update: (user, userId) => dispatch(update(user, userId)),
  logout: () => dispatch(logout())
  //receiveCurrentUser: (userId) => dispatch(receiveCurrentUser(userId))
})
export default connect(mSTP , mDTP)(EditForm)