import { connect } from "react-redux";
import EditForm from './edit-profile';
import {update} from '../../actions/session_actions';


const mSTP = (state) =>({
  user: state.session.user
})

const mDTP = (dispatch) =>({
  update: (user, userId) => dispatch(update(user, userId)),
  //receiveCurrentUser: (userId) => dispatch(receiveCurrentUser(userId))
})
export default connect(mSTP , mDTP)(EditForm)