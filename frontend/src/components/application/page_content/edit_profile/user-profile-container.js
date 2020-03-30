import { connect } from "react-redux";
import UserProfile from "./user-profile";

const mSTP = state => ({
  user: state.session.user
});

export default connect(mSTP)(UserProfile);
