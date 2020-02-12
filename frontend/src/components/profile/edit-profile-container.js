import { connect } from "react-redux";
import EditForm from './edit-profile';
import {update} from '../../actions/session_actions';

const mSTP = (state) =>({
  user: state.session.user
})

const mDTP = (dispatch) =>({
  update: (user) => dispatch(update(user))
})
export default connect(mSTP , mDTP)(EditForm)