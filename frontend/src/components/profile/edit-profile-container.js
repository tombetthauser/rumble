import { connect } from "react-redux";
import EditForm from './edit-profile';


const mSTP = (state) =>({
  user: state.session.user

})

export default connect(mSTP)(EditForm)